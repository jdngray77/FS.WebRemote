import { v4 as uuid } from 'uuid';
import { Logging } from '../Utility/Logging';
import { FSUIPCResponse as Response } from './Models/Response/FSUIPCResponse'
import { FSUIPCRequest as Request } from './Models/Request/FSUIPCRequest'

type ResponseHandler<TResponse extends Response> = (r: TResponse) => void;

export class FSUIPC
{
    constructor() {}

    private ws: WebSocket | null = null;
    private connected: Boolean = false;

    private handlers: Map<string, ResponseHandler<any>> = new Map();
  
    IsConnected(): Boolean
    {
      return this.connected;
    }

    Connect() 
    {
      const self = this;
      Logging.Log("uwu");
      this.ws = new WebSocket('ws://192.168.0.13:2048/fsuipc/', "fsuipc");

      this.ws.onopen = function (e: Event) {
          Logging.Log("WebSocket Open");
          Logging.LogWebSocketEvent(e);
        };
    
        this.ws.onclose = function (e: Event) {
          Logging.Log("WebSocket Closed");
          Logging.LogWebSocketEvent(e);
        };
    
        this.ws.onerror = function (e: Event) {
          Logging.Log("WebSocket Error");
          Logging.LogWebSocketEvent(e);
          self.ws = null;
        }

        this.ws.onmessage = function (msg: MessageEvent) {
          Logging.LogWebSocketEvent(msg)

          try {
            let y: Response = JSON.parse(msg.data) as Response;
            
            if (y.name == null) 
            {
              Logging.LogWarning("Got response with no id!");
              return;
            }

            let id: string = y.name;
            let handler = self.handlers.get(id);

            handler!(y);
          } 
          catch (e)
          {
            Logging.LogError("Failed handling FSUIPC response", e);
          }
        }
    }
    
    SendRequest<THandler extends Response>(request: Request, responseHandler: ResponseHandler<THandler>)
    {
      this.AssertConnected();

      const id = uuid();
      
      request.name = id;
      this.handlers.set(id, responseHandler)
  

      let json = JSON.stringify(request);
      Logging.Log(json)
      this.ws?.send(json)
    }

    async SendRequestAndWait(request: Request): Promise<Response> {
      return new Promise((resolve, reject) => {

        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, 5000);

        this.SendRequest(request, (r: Response) => {
            resolve(r);
        });
      });
    }

    private AssertConnected() 
    {
      if (!this.IsConnected)
      {
        throw new Error("attempted to talk to FSUIPC whilst not connected to FSUIPC");
      }
    }
}