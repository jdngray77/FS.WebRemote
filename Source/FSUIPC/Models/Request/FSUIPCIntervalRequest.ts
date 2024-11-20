import { FSUIPCRequest } from "./FSUIPCRequest";

export class FSUIPCIntervalRequest extends FSUIPCRequest
{
    constructor
    (
        command: nbl<string> = null,
        name: nbl<string> = null,
        public interval: nbl<string> = '0'
    )
    {
        super(command, name)
    }
}