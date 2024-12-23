import {v4 as uuid} from 'uuid';
import {Logging} from '../Utility/Logging';
import {FSUIPCResponse as Response} from './Models/Response/FSUIPCResponse'
import {FSUIPCRequest, FSUIPCRequest as Request} from './Models/Request/FSUIPCRequest'
import {DynamicResponseHandler, ResponseHandler} from "./DynamicResponseHandler";
import {IFSUIPC} from "./IFSUIPC";
import {Commands} from "./Models/Request/Commands";

export class FSUIPC implements IFSUIPC {
	constructor() {}

	private ws: WebSocket | null = null;
	private connected: Boolean = false;

	private handlers: Map<string, ResponseHandler<any>> = new Map()
	private dynamicHandlers: Map<string, DynamicResponseHandler> = new Map()

	private requests: number = 0;
	private messages: number = 0;
	private handlingFailures: number = 0;
	private about: string = "";

	public GetAddress(): ubl<string>
	{
		return this.ws?.url ?? undefined;
	}

	public GetHandlerCount(): number
	{
		return this.handlers.size;
	}

	public GetDynamicHandlerCount(): number
	{
		return this.dynamicHandlers.size;
	}

	public GetRequestsSent(): number
	{
		return this.requests;
	}

	public GetMessagesReceived(): number
	{
		return this.messages;
	}

	public GetHandlingFailures(): number
	{
		return this.handlingFailures;
	}

	public GetServerInfo(): string
	{
		return this.about;
	}

	IsConnected(): Boolean {
		return this.connected;
	}

	ConnectAsync(address: string = 'ws://192.168.0.13:2048/fsuipc/'): Promise<any> {
		return new Promise((resolve, reject) => {
			Logging.Log("uwu");

			const self = this;
			const _resolve = resolve;
			const _reject = reject;

			const timeoutId = setTimeout(() => {
				self.ws?.close();
				self.ws = null;
				reject(new Error("Did not connect to the web socket in a reasonable time."));
			}, 5000);

			this.ws = new WebSocket(address, "fsuipc");

			this.ws.onopen = function (e: Event) {
				Logging.Log("WebSocket Open");
				try
				{
					clearTimeout(timeoutId)
					self.SendRequest(
						new Request(Commands.AboutRead),
						(r: Response) => {

							if (r.success)
							{
								// @ts-ignore
								const {data} = r;
								self.about = JSON.stringify(data, null, 2)
							}
						}
					);

					_resolve(undefined);
				} catch (e) {}
			};

			this.ws.onclose = function (e: Event) {
				Logging.Log("WebSocket Closed");
			};

			this.ws.onerror = function (e: Event) {
				Logging.Log("WebSocket Error");
				try
				{
					_reject("Failed to connect.");
				} catch (e) {}
				self.ws = null;
			}

			this.ws.onmessage = function (msg: MessageEvent) {
				Logging.LogWebResponse(msg.data)
				self.messages++;

				let fsuipcResponse: Response = JSON.parse(msg.data) as Response;

				try {
					self.HandleResponse(fsuipcResponse);
				} catch (e) {
					Logging.LogError("Failed handling FSUIPC response", e);
					self.handlingFailures++;
				}
			}
		});
	}

	ForgetDynamicHandlerByName(name: string) {
		if (this.dynamicHandlers.has(name))
		{
			this.dynamicHandlers.delete(name)
		}
	}

	ForgetDynamicHandler(handler: DynamicResponseHandler)
	{
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

	/**
	 * Sends a FSUIPC Web Socket Server request identified by its name property
	 * and registers a {@link DynamicResponseHandler} (if it has not already been registered)
	 * which will handle all future requests with the same name.
	 *
	 * For api comms where _many_ requests and responses will be under the same name.
	 *
	 * @param request The request to be sent.
	 *
	 * @param responseHandler The handler to be registered.
	 * 						  Only required to be provided once, if provided again is ignored.
	 */
	SendNamedRequest(
		request: Request,
		responseHandler: nbl<DynamicResponseHandler> = null
	) {
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

	/**
	 * Sends a FSUIPC Web Socket Server request, and optionally registers a {@link ResponseHandler}
	 * that will be executed upon reciept of a response.
	 *
	 * Generates a UUID which is used to identify the request and it's handler.
	 *
	 * Use this for single-fire requests, such as {@link Commands.AboutRead}.
	 *
	 * Some requests however use persistent names. For example, variable groups
	 * are identified by a 'Variable Group Name', which must be used for all requests
	 * relating to that variable group.
	 *
	 * In that scenario, use {@link SendNamedRequest} providing a {@link DynamicResponseHandler}.
	 *
	 * @param request The request to be sent.
	 * @param responseHandler The handler to be registered.
	 * @constructor
	 */
	SendRequest<THandler extends Response>(
		request: Request,
		responseHandler: nbl<ResponseHandler<THandler>> = null)
	{
		this.AssertConnected();

		const id = uuid();

		request.name = id;

		if (responseHandler != null) {
			this.handlers.set(id, responseHandler)
		}

		this.SendRequestCore(request);
	}

	async SendRequestAsync(request: Request): Promise<Response> {
		return new Promise((resolve, reject) => {

			setTimeout(() => {
				reject(new Error('Request timed out'));
			}, 5000);

			this.SendRequest(request, (r: Response) => {
				resolve(r);
			});
		});
	}

	private AssertConnected() {
		if (!this.IsConnected) {
			throw new Error("attempted to talk to FSUIPC whilst not connected to FSUIPC");
		}
	}

	private SendRequestCore(request: FSUIPCRequest) {
		let json = JSON.stringify(request);
		Logging.LogWebRequest(json)
		this.ws?.send(json)
		this.requests++;
	}

	private HandleResponse(fsuipcResponse: Response) {
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
}