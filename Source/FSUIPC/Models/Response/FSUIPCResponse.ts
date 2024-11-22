export class FSUIPCResponse 
{
    public command: string | null = null;
    public name: string | null = null;
    public success: boolean | null = null;
    public errorMessage: string | null = null;
    public errorCode: string | null = null;

    public AssertSuccess(reason: string = 'Response not successful')
    {
        if (this.success == null || !this.success)
        {
            throw new Error(reason + " " + this);
        }
    }
}