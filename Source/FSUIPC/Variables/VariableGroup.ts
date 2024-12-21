import { SimVariable } from "./SimVariable";
import {Updatable} from "../../Utility/Updatable";
import {FSUIPCVarsResponse} from "../Models/Response/FSUIPCVarsResponse";
import {Logging} from "../../Utility/Logging";

/**
 * Simple named collection of variables.
 */
export class VariableGroup extends Updatable<FSUIPCVarsResponse>
{
    override Update(update: FSUIPCVarsResponse)
    {
        if (update.name != this.name)
        {
            Logging.LogWarning(`Update '${update.name}' is not for this group (${this.name})`);
            return;
        }

        Logging.LogTrace(`Updating group '${this.name}'`);

        Object.entries(update.data).forEach(([key, value]) => {
            let variableToUpdate = this.variables.find(it => it.Name == key);

            if (variableToUpdate == undefined)
            {
                Logging.LogWarning(`Tried to update ${key} in ${this.name}, but that variable does not exist in this variable group.`)
                return;
            }

            variableToUpdate.LastKnownValue = value;
            Logging.Log(`Updated ${variableToUpdate.Name} to ${variableToUpdate.LastKnownValue}`)
        });

        super.Update(update);
    }

    constructor
    (
        public name: string,
        public variables: SimVariable[] = []
    )
    {
        super();
    }
}