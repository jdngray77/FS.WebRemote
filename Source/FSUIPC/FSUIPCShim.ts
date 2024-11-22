import {IFSUIPC} from "./IFSUIPC";
import {DynamicResponseHandler, ResponseHandler} from "./DynamicResponseHandler";
import {FSUIPCResponse as Response, FSUIPCResponse} from "./Models/Response/FSUIPCResponse";
import {FSUIPCRequest} from "./Models/Request/FSUIPCRequest";
import {Logging} from "../Utility/Logging";
import {Commands} from "./Models/Request/Commands";
import {v4 as uuid} from "uuid";
import {FSUIPCVarsRequest} from "./Models/Request/FSUIPCVarsRequest";
import {VariableGroup} from "./Variables/VariableGroup";
import {SimVariable} from "./Variables/SimVariable";
import {FSUIPCIntervalRequest} from "./Models/Request/FSUIPCIntervalRequest";
import {UtilFunctions} from "../Utility/UtiFunctions";

export class FSUIPCShim implements IFSUIPC
{
	constructor() {
		Logging.LogWarning(`=================================
		SHIM ACTIVE  -- NOT USING REAL DATA.
		=================================`);

		UtilFunctions.Sleep(5000);
	}

	private connected: boolean = false;
	private handlers: Map<string, ResponseHandler<any>> = new Map()
	private dynamicHandlers: Map<string, DynamicResponseHandler> = new Map()

	private variableGroups: VariableGroup[] = []

	AssertConnected(): void
	{
		if (!this.IsConnected)
		{
			throw new Error("attempted to talk to FSUIPC whilst not connected to FSUIPC");
		}
	}

	ConnectAsync(): Promise<any>
	{
		return new Promise((resolve, reject) => {
			Logging.Log("uwu");
			Logging.Log("WebSocket Open");
			this.connected = true;
			resolve(undefined);
		})
	}

	ForgetDynamicHandler(handler: DynamicResponseHandler): void {
		let name: nbl<string> = null;

		this.dynamicHandlers.forEach((_handler, _name) => {
			if (_handler == handler)
			{
				name = _name
				return;
			}
		})

		if (name == null)
		{
			return
		}

		this.dynamicHandlers.delete(name);
	}

	ForgetDynamicHandlerByName(name: string): void {
		if (this.dynamicHandlers.has(name))
		{
			this.dynamicHandlers.delete(name)
		}
	}

	IsConnected(): Boolean
	{
		return this.connected;
	}

	SendNamedRequest(request: FSUIPCRequest, responseHandler: nbl<DynamicResponseHandler>): void
	{
		this.AssertConnected();

		if (request.name == null) {
			throw new Error('No name provided in request.')
		}

		// Handler
		if (this.dynamicHandlers.get(request.name) == undefined) {
			if (responseHandler == null) {
				throw new Error('No handler provided, and none was previously registered.');
			}

			this.dynamicHandlers.set(request.name, responseHandler);
		}

		this.SendRequestCore(request);
	}

	SendRequest<THandler extends FSUIPCResponse>(request: FSUIPCRequest, responseHandler: nbl<ResponseHandler<THandler>>): void
	{
		this.AssertConnected();

		const id = uuid();

		request.name = id;

		if (responseHandler != null) {
			this.handlers.set(id, responseHandler)
		}

		this.SendRequestCore(request);
	}

	SendRequestAsync(request: FSUIPCRequest): Promise<FSUIPCResponse> {
		return new Promise((resolve, reject) => {

			setTimeout(() => {
				reject(new Error('Request timed out'));
			}, 5000);

			this.SendRequest(request, (r: Response) => {
				resolve(r);
			});
		});
	}

	SendRequestCore(request: FSUIPCRequest): void
	{
		Logging.Log("[ ^^^ REQUEST ^^^  ]" + JSON.stringify(request))
		var responseJson = this.GenerateResponse(request)
		this.MockRecievedResponse(responseJson);
	}

	private MockRecievedResponse(jsonData: string)
	{
		Logging.Log("[ vvv RESPONSE VVV ]" + jsonData)

		let fsuipcResponse: Response = JSON.parse(jsonData) as Response;

		try {
			this.HandleResponse(fsuipcResponse);
		} catch (e) {
			Logging.LogError("Failed handling FSUIPC response", e);
		}
	}

	private HandleResponse(fsuipcResponse: Response)
	{
		if (!fsuipcResponse.success) {
			Logging.LogError("FSUIPC WSS sent us an error!", fsuipcResponse)
			return;
		}

		if (fsuipcResponse.name == null) {
			Logging.LogWarning("Got response with no id!");
			return;
		}

		let id: string = fsuipcResponse.name;

		// UUID Handler
		let uuidHandler = this.handlers.get(id);

		if (uuidHandler != undefined) {
			uuidHandler!(fsuipcResponse);
			return;
		}

		// Dynamic Response
		let dynamicHandler = this.dynamicHandlers.get(id);

		if (dynamicHandler != undefined) {
			dynamicHandler.Handle(fsuipcResponse);
			return;
		}

		Logging.Log("No handler for response '" + id + "'");
	}

	private GenerateResponse(request: FSUIPCRequest) : string
	{
		switch (request.command)
		{
			case Commands.AboutRead:
				return `{
  "data": {
    "isConnectionOpen": true,
    "flightSim": "MSFS",
    "flightSimVersionCode": 110,
    "flightSimVersionText": "MSFS (V11.0)",
    "FSUIPCWebSocketServerVersion": "1.1.2.26",
    "newServerVersionAvailable": false,
    "FSUIPCVersion": "7.406",
    "isConnectedToWideClient": false
  },
  "command": "about.read",
  "name": "${request.name}",
  "success": true,
  "errorMessage": null,
  "errorCode": null
}`
				break;

			case Commands.VarsRead:
				let self = this;

				function getReadVarsResponse() : string {
					let str: string[] = []
					let knownGroup = self.variableGroups.find(it => it.name == request.name)!;

					str.push(`{
  "data": {`);

					knownGroup.variables.forEach((i) => {
						str.push(`"${i.Name}": ${Math.random() < 0.5 ? 0.0 : 1.0}`)
					});

					str.push(`},
  "command": "vars.read",
  "name": "ELEC Panel",
  "success": true,
  "errorMessage": null,
  "errorCode": null
}`);
					return str.join("");
				}

				let readRequest = request as FSUIPCIntervalRequest;
				if (readRequest.interval != null)
				{
					setInterval(() => {
						this.MockRecievedResponse(getReadVarsResponse())
					}, readRequest.interval);
				}

				return getReadVarsResponse();

			case Commands.VarsDeclare:
				let _request = request as FSUIPCVarsRequest
				let group: VariableGroup = new VariableGroup(request.name!);

				_request.vars.forEach((i) => {
					group.variables.push(new SimVariable(i.name, i.name))
				});

				this.variableGroups.push(group);

				return `{
  "command": "vars.declare",
  "name": "${request.name}",
  "success": true,
  "errorMessage": null,
  "errorCode": null
}`
		}

		return `{
  "command": "${request.command}",
  "name": "${request.name}",
  "success": false,
  "errorMessage": "SHIM: No response programmed for this command.",
  "errorCode": "SHIM : un-mocked command."
}`
	}
}