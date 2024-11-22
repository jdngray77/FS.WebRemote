export class FSUIPCResponse
{
    public command: string | null = null;
    public name: string | null = null;
    public success: boolean | null = null;
    public errorMessage: string | null = null;
    public errorCode: string | null = null;

    static AssertSuccess(
        response: FSUIPCResponse,
        reason: string = 'Response not successful')
    {
        if (response.success == null || !response.success)
        {
            throw new Error(reason + " " + response);
        }
    }
}