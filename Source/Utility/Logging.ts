export class Logging {
    static readonly enableWebServiceLogging: Boolean = true;

    private constructor() {}

    static Log(s: string) 
    {
        console.log(s);
    }

    static LogError(s: string | null, e: unknown) 
    {
        console.error(s, e);
    }

    static LogWarning(s: string) 
    {
        console.warn(s);
    }

    static LogWebSocketEvent(e: Event) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log(e);            
        }
    }

    static LogWebResponse(e: Event) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log("[ vvv RESPONSE VVV ]" + e);            
        }
    }

    static LogWebRequest(e: string) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log("[ ^^^ REQUEST ^^^ ]" + e);            
        }
    }


}
