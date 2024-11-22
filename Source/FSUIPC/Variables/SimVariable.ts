export class SimVariable 
{
    constructor
    (
        public FriendlyName: string,        // User friendly name
        public Name: string,                // Sim variable name
        public Offset: nbl<string> = null,  // Optional data offset
    ){}

    public IsOffset() : Boolean
    {
        return this.Offset != null
    }
}
