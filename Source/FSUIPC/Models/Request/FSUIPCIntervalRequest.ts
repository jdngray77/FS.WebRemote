import { FSUIPCRequest } from "./FSUIPCRequest";

export class FSUIPCIntervalRequest extends FSUIPCRequest
{
    constructor
    (
        command: string,
        name: nbl<string> = null,
        public interval: number = 0
    )
    {
        super(command, name)
    }
}