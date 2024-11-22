import {FSUIPCResponse as Response} from "./Models/Response/FSUIPCResponse";
import {Logging} from "../Utility/Logging";

export type ResponseHandler<TResponse extends Response> = (r: TResponse) => void;

/**
 * A handler for non-guid requests which executes a particular handler
 * based on the command the response is for.
 */
export class DynamicResponseHandler
{
	private ResponseHandlers: Map<string, ResponseHandler<any>> = new Map();

	public Handle(response: Response)
	{
		let handler = this.ResponseHandlers.get(response.command ?? "");

		if (handler == undefined)
		{
			Logging.LogWarning("No dynamic handler for '" + (response.command ?? "") + "'")
			return;
		}

		handler!(response);
	}

	public On(command: string, handler: ResponseHandler<any>): DynamicResponseHandler
	{
		if (this.ResponseHandlers.has(command))
		{
			throw new Error("Duplicate handler '" + command + "'");
		}

		this.ResponseHandlers.set(command, handler)

		return this;
	}
}