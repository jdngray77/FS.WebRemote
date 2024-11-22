import { Logging } from "../../Utility/Logging";
import { FSUIPC } from "../fsuipc";
import { Commands } from "../Models/Request/Commands";
import { FSUIPCVarDefinition } from "../Models/Request/FSUIPCVarDefinition";
import { FSUIPCVarsRequest } from "../Models/Request/FSUIPCVarsRequest";
import { FSUIPCResponse } from "../Models/Response/FSUIPCResponse";
import { VariableGroup } from "./VariableGroup";
import { SimVariable } from "./SimVariable";
import {FSUIPCRequest} from "../Models/Request/FSUIPCRequest";
import {FSUIPCIntervalRequest} from "../Models/Request/FSUIPCIntervalRequest";
import {DynamicResponseHandler} from "../DynamicResponseHandler";
import {IFSUIPC} from "../IFSUIPC";

// TODO offsets

/**
 *  Manages reading and writing of variables via {@link FSUIPC}
 *
 *  @usage Declare a group of variables with {@link CreateVariableGroupAsync},
 *         then read all values with {@link ReadVariableGroup}, or
 *         start automatic updates with {@link StartVariableGroupPolling}.
 *
 *  @extends IDisposable Should be disposed when no longer required to
 *                       stop variable updates and delete variable groups.
 */
export class VariableManager implements IDisposable
{
    public readonly DefaultUpdateInterval: number = 2000;

    private variableGroups: VariableGroup[] = []

    private responseHandler: DynamicResponseHandler = new VariableManagerDynamicResponseHandler();

    OnUpdate(x: (a: any) => void) 
    {
        // TODO
    }

    constructor
    (   
        private ws: IFSUIPC
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

    /**
     * Creates a group of variables.
     *
     * Variables should be grouped in logical ways such that updates occour for groups
     * of variables that relate to each other. i.e one group per cockpit panel
     *
     * @param name Friendly name identifying the variable group. Used in all subsequent operations to
     *             identify the group.
     *
     * @param variables The variables that are members of this group.
     *
     * @returns Representation of the variable group that was created.
     *
     * @throws Error If FSUIPC rejects or fails to create the variable group.
     */
    public CreateVariableGroupAsync(name: string, ...variables: SimVariable[]): Promise<VariableGroup>
    {
        let group: VariableGroup = new VariableGroup(name, variables);
        return this.AddVariableGroupAsync(group);
    }

    /**
     * Creates a group of variables.
     *
     * Variables should be grouped in logical ways such that updates occour for groups
     * of variables that relate to each other. i.e one group per cockpit panel
     *
     * @param name Friendly name identifying the variable group. Used in all subsequent operations to
     *             identify the group.
     *
     * @param variables The variables that are members of this group.
     *
     * @returns Representation of the variable group that was created.
     *
     * @throws Error If FSUIPC rejects or fails to create the variable group.
     */
    public async AddVariableGroupAsync(group: VariableGroup)
    {
        await this.RegisterVariableGroupCore(group)
        this.variableGroups.push(group);
        return group;
    }
    //
    // /**
    //  * Reads a variable group's values at present.
    //  *
    //  * Does not start polling.
    //  */
    // public ReadVariableGroupAsync(group: VariableGroup)
    // {
    //     return this.ReadVariableGroupByNameAsync(group.name);
    // }
    //
    // /**
    //  * Reads a variable group's values at present.
    //  *
    //  * Does not start polling.
    //  */
    // public async ReadVariableGroupByNameAsync(name: string)
    // {
    //     this.AssertGroupKnown(name);
    //     let request: FSUIPCRequest = new FSUIPCIntervalRequest(Commands.VarsRead, name);
    //     let response: FSUIPCResponse = await this.ws.SendRequestAsync(request);
    //     response.AssertSuccess("Failed to read variable group");
    // }

    /**
     * Begins regular polling of the group's values.
     *
     * @param group The group to poll
     * @param intervalMs The interval to poll in milliseconds, defaults to {@link DefaultUpdateInterval}
     */
    public StartVariableGroupPolling(group: VariableGroup, intervalMs: number = this.DefaultUpdateInterval)
    {
        this.StartVariableGroupPollingByName(group.name, intervalMs);
    }

    /**
     * Begins regular polling of the group's values.
     *
     * @param name The name of the group to poll
     * @param intervalMs The interval to poll in milliseconds, defaults to {@link DefaultUpdateInterval}
     */
    public StartVariableGroupPollingByName(name: string, intervalMs: number = this.DefaultUpdateInterval)
    {
        this.AssertGroupKnown(name);

        let request: FSUIPCRequest = new FSUIPCIntervalRequest(Commands.VarsRead, name, intervalMs);
        this.ws.SendNamedRequest(request, this.responseHandler);
    }

    public RemoveVariableGroup(name: string): Boolean 
    {
        throw new Error('not implemented');

        // TODO unregister
        if (this.GetGroup(name) == undefined)
        {
            return false;
        }

        return false;
    }

    private RegisterVariableGroupCore(group: VariableGroup)
    {
        if (group.name == null)
        {
            throw new Error('Group has no name.');
        }

        // Create request
        let request: FSUIPCVarsRequest = new FSUIPCVarsRequest(Commands.VarsDeclare);
        request.name = group.name;


        // Add variables
        group.variables.forEach(inputVariable =>
        {
            let varRequest = new FSUIPCVarDefinition(inputVariable.Name)
            request.vars!.push(varRequest);
        });

        this.ws.SendNamedRequest(request, this.responseHandler);
    }

    private AssertGroupKnown(name: string)
    {
        if (!this.variableGroups.some(it => it.name == name))
        {
            throw new Error("Variable group '" + name + "' unknown to this manager. Was it registered?")
        }
    }
}

/**
 * Internal class to handle web service responses to variable groups.
 */
class VariableManagerDynamicResponseHandler extends DynamicResponseHandler
{
    constructor()
    {
        super();

        super.On(Commands.VarsRead, this.HandleVarsRead)
    }

    // TODO response model
    HandleVarsRead(response: FSUIPCResponse)
    {

    }
}