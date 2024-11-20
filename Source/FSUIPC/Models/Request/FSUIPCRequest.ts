export class FSUIPCRequest 
{
    constructor
    (
        public command: nbl<string> = null,
        public name: nbl<string> = null
    ) 
    {}
}