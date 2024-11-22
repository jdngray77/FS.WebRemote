export class FSUIPCRequest 
{
    constructor
    (
        public command: string,
        public name: nbl<string> = null
    ) 
    {}
}