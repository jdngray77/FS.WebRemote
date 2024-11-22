import {DynamicResponseHandler, ResponseHandler} from "./DynamicResponseHandler";
import {FSUIPCRequest as Request} from "./Models/Request/FSUIPCRequest";
import {FSUIPCResponse as Response} from "./Models/Response/FSUIPCResponse";

export interface IFSUIPC {
	IsConnected(): Boolean;

	ConnectAsync(): Promise<any>;

	ForgetDynamicHandlerByName(name: string): void;

	ForgetDynamicHandler(handler: DynamicResponseHandler): void;

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
		responseHandler: nbl<DynamicResponseHandler>
	): void;

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
		responseHandler: nbl<ResponseHandler<THandler>>): void;

	SendRequestAsync(request: Request): Promise<Response>;
}