export class Logging {
    static readonly enableWebServiceLogging: Boolean = true;

    private static i: number = 0;

    private constructor() {}

    static Log(s: string) 
    {
        console.log(this.index(s));
    }

    static LogError(s: string | null, e: unknown) 
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
            console.log(this.index("[ vvv RESPONSE VVV ]" + e));
        }
    }

    static LogWebRequest(e: string) 
    {
        if (this.enableWebServiceLogging) 
        {
            console.log(this.index("[ ^^^ REQUEST ^^^ ]" + e));
        }
    }

    private static index(s: string | null): string
    {
        this.i++;
        return "[" + this.i + "]" + " " + s;
    }
}
