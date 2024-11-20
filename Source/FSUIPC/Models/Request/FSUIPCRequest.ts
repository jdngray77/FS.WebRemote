export class FSUIPCRequest 
{
    public command: nbl<string> = null;
    public name: nbl<string> = null;

    constructor(command: nbl<string> = null) 
    {
        this.command = command;
    }
}