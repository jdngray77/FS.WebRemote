import {FSUIPCResponse} from "./FSUIPCResponse";

export class FSUIPCVarsResponse extends FSUIPCResponse
{
	public data: { [key: string]: number } = {};
}