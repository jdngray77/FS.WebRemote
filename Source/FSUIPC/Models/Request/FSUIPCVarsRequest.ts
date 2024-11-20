import { SimVariable } from "../../Variables/SimVariable";
import { FSUIPCIntervalRequest } from "./FSUIPCIntervalRequest"
import { FSUIPCVarDefinition } from "./FSUIPCVarDefinition";

export class FSUIPCVarsRequest extends FSUIPCIntervalRequest
{
    constructor
    (
        command: nbl<string> = null,
        name: nbl<string> = null,
        interval: nbl<string> = '0',
        public changesOnly: nbl<boolean> = null,
        public vars: nbl<FSUIPCVarDefinition[]> = null,
        public allowCreate: nbl<boolean> = null,
        public code: nbl<string> = null,
        public notify: nbl<string> = null,
    )
    {
        super(command, name, interval);
    }
}