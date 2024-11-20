export class SimVariable 
{
    constructor
    (
        public Name: nbl<string> = null,
        public Offset: nbl<string> = null,
    ){}

    public IsOffset() : Boolean
    {
        return this.Offset != null
    }
}
