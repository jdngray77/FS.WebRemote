import { FSUIPC } from "../fsuipc";
import { Commands } from "../Models/Request/Commands";
import { FSUIPCVarDefinition } from "../Models/Request/FSUIPCVarDefinition";
import { FSUIPCVarsRequest } from "../Models/Request/FSUIPCVarsRequest";
import { FSUIPCResponse } from "../Models/Response/FSUIPCResponse";
import { VariableGroup } from "../VariableGroup";
import { SimVariable } from "./SimVariable";

export class VariableManager implements IDisposable
{
    private variableGroups: VariableGroup[] = []

    OnUpdate(x: (a: any) => void) 
    {
        // TODO
    }

    constructor
    (   
        private ws: FSUIPC
    ){}

    Dispose(): void {
        // TODO unhook when listening to updates
    }

    public GetVariableGroups(): VariableGroup[] 
    {
        return [...this.variableGroups];
    }

    public GetGroup(name: string): ubl<VariableGroup>
    {
        return this.variableGroups.find(it => it.name == name)
    }

    public AddVariableGroup(group: VariableGroup)
    {
        this.variableGroups.push(group);
    }

    public CreateVariableGroup(name: string, ...variables: SimVariable[]): VariableGroup
    {
        let group: VariableGroup = new VariableGroup(name, variables);
        this.variableGroups.push(group);

        let request: FSUIPCVarsRequest = new FSUIPCVarsRequest(Commands.VarsDeclare);

        request.vars = [
            new FSUIPCVarDefinition("ParkingBrake_Position")
        ]

        this.ws.SendRequest(request, (r: FSUIPCResponse) => { });

        return group;
    }
    
    public RemoveVariableGroup(name: string): Boolean 
    {
        // TODO unregister
        if (this.GetGroup(name) == undefined)
        {
            return false;
        }

        return false;
    }
}