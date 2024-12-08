export class Logging {
    static readonly enableWebServiceLogging: Boolean = true;
    static readonly enableTrace: Boolean = true;

    private static i: number = 0;

    private constructor() {}

    static Log(s: string) 
    {
        console.log(this.index(s));
    }

    static LogError(s: string | null, e: unknown | null = null)
    {
        console.error(this.index(s), e);
    }

    static LogWarning(s: string) 
    {
        console.warn(this.index(s));
    }

    static LogWebSocketEvent(e: Event) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log(this.index("") + e);
        }
    }

    static LogWebResponse(e: Event) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log(this.index("[ vvv RESPONSE VVV ] \n" + e));
        }
    }

    static LogWebRequest(e: string) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log(this.index("[ ^^^ REQUEST ^^^ ] \n" + e));
        }
    }

    static LogTrace(s: string)
    {
        if (this.enableTrace)
        {
            console.log("[TRACE] " + s)
        }
    }

    private static index(s: string | null): string
    {
        this.i++;
        return "[" + this.i + "]" + " " + s;
    }
}
