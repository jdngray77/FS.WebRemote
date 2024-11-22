import { SimVariable } from "../../Variables/SimVariable";
import { FSUIPCIntervalRequest } from "./FSUIPCIntervalRequest"
import { FSUIPCVarDefinition } from "./FSUIPCVarDefinition";

export class FSUIPCVarsRequest extends FSUIPCIntervalRequest
{
    constructor
    (
        command: string,
        name: nbl<string> = null,
        interval: number = 0,
        public changesOnly: boolean = true,
        public vars: FSUIPCVarDefinition[] = [],
        public allowCreate: boolean = false,
        public code: nbl<string> = null,
        public notify: nbl<string> = null,
    )
    {
        super(command, name, interval);
    }
}