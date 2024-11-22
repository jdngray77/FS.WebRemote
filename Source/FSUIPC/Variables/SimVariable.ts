import {Updatable} from "../../Utility/Updatable";
import {FSUIPCVarsResponse} from "../Models/Response/FSUIPCVarsResponse";

/**
 * Represents a sim variable
 *
 * is indifferent to the type of variable.
 */
export class SimVariable extends Updatable<number>
{
    constructor
    (
        public FriendlyName: string,        // User friendly name
        public Name: string,                // Sim variable name
        public Offset: nbl<string> = null,  // Optional data offset
    )
    {
        super();
    }

    override Update(update: number)
    {
        this.LastKnownValue = update;
        super.Update(update);
    }

    public LastKnownValue: number = 0;

    public IsOffset() : Boolean
    {
        return this.Offset != null
    }
}
