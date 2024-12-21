import { FSUIPC } from "../fsuipc";
import { Commands } from "../Models/Request/Commands";
import { FSUIPCVarDefinition } from "../Models/Request/FSUIPCVarDefinition";
import { FSUIPCVarsRequest } from "../Models/Request/FSUIPCVarsRequest";
import { FSUIPCResponse } from "../Models/Response/FSUIPCResponse";
import { VariableGroup } from "./VariableGroup";
import { SimVariable } from "./SimVariable";
import {FSUIPCRequest as Request, FSUIPCRequest} from "../Models/Request/FSUIPCRequest";
import {FSUIPCIntervalRequest} from "../Models/Request/FSUIPCIntervalRequest";
import {DynamicResponseHandler} from "../DynamicResponseHandler";
import {IFSUIPC} from "../IFSUIPC";
import {FSUIPCVarsResponse} from "../Models/Response/FSUIPCVarsResponse";
import {Updatable} from "../../Utility/Updatable";
import {Logging} from "../../Utility/Logging";

// TODO offsets
// TODO set value
// TODO updates

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
export class VariableManager extends Updatable<FSUIPCVarsResponse> implements IDisposable
{
    /**
     * Default value for 'interval' in {@link StartVariableGroupPolling}.
     *
     * Default value is 2 seconds / 2000ms.
     */
    public readonly DefaultUpdateInterval: number = 2000;

    private variableGroups: VariableGroup[] = [];

    private responseHandler: VariableManagerDynamicResponseHandler;

    constructor
    (   
        private ws: IFSUIPC
    )
    {
        super();

        this.responseHandler = new VariableManagerDynamicResponseHandler()
        this.responseHandler.OnVarRead = (it) => this.Update(it);
        this.responseHandler.OnVarRemove = (it) => this.DeleteGroupCore(it.name);
    }

    Dispose(): void
    {
        this.ForAllGroups(this.StopVariableGroupPolling);
        this.ForAllGroups(this.RemoveVariableGroup);
    }

    /**
     * Notifies this variable manager than there's a variable group update
     * to process.
     *
     * If the update does not correspond to a known group, returns with no effect.
     *
     * Otherwise, forwards the update to the corresponding variable group, and then the global update listeners.
     *
     * @param update The update to process.
     */
    override Update(update: FSUIPCVarsResponse)
    {
        Logging.LogTrace(`Variable group got update for '${update.name}'`)

        if (update.name == null)
        {
            Logging.LogTrace(`Variable group got update did not contain a name!`)
            return;
        }

        let groupToUpdate = this.GetGroup(update.name!);

        if (groupToUpdate == null)
        {
            Logging.LogWarning(`Received update for ${update.name}, but that group is not known to this variable manager.`)
            return;
        }

        Logging.LogTrace(`Variable group confirmed owns group subject to update. Updating!`)

        groupToUpdate.Update(update)
        super.Update(update);
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
     * Requests creation a group of variables.
     *
     * Variables should be grouped in logical ways such that updates occour for groups
     * of variables that relate to each other. i.e one group per cockpit panel
     *
     * @param name Friendly name identifying the variable group. Used in all subsequent operations to
     *             identify the group.
     *
     * @param variables The variables that are members of this group.
     *
     * @returns Representation of the variable group that was created. Not populated with variable values.
     *
     * @throws Error If FSUIPC rejects or fails to create the variable group.
     */
    public async CreateVariableGroupAsync(name: string, ...variables: SimVariable[]): Promise<VariableGroup>
    {
        Logging.LogTrace(`Creating variable group with name '${name}'`)

        let group: VariableGroup = new VariableGroup(name, variables);
        return await this.AddVariableGroupAsync(group);
    }

    /**
     * Requests the creation of a group of variables.
     *
     * Variables should be grouped in logical ways such that updates occour for groups
     * of variables that relate to each other. i.e one group per cockpit panel
     *
     * @param name Friendly name identifying the variable group. Used in all subsequent operations to
     *             identify the group.
     *
     * @param variables The variables that are members of this group.
     *
     * @returns Representation of the variable group that was created. Not populated with variable values.
     *
     * @throws Error If FSUIPC rejects or fails to create the variable group.
     */
    public async AddVariableGroupAsync(group: VariableGroup)
    {
        await this.RegisterVariableGroupCore(group)

        Logging.LogTrace(`Remembering variable group with name ${group.name}`)
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

    public StopVariableGroupPolling(group: VariableGroup)
    {
        this.StopVariableGroupPollingByName(group.name);
    }

    public StopVariableGroupPollingByName(name: string)
    {
        Logging.LogTrace(`Stopping updates for group '${name}'`);
        this.AssertGroupKnown(name);

        let request = new Request(Commands.VarsStop, name);
        this.ws.SendNamedRequest(request, this.responseHandler);
    }

    public RemoveVariableGroup(group: VariableGroup)
    {
        this.RemoveVariableGroupByName(group.name)
    }

    public RemoveVariableGroupByName(name: string)
    {
        this.AssertGroupKnown(name);

        let request = new Request(Commands.VarsRemove, name);
        this.ws.SendNamedRequest(request, this.responseHandler);
    }

    private async RegisterVariableGroupCore(group: VariableGroup)
    {
        return new Promise((resolve, reject) =>
        {
            if (group.name == null)
            {
                throw new Error('Group has no name.');
            }

            Logging.LogTrace(`Composing request for variable group with name ${group.name}`);

            // Create request
            let request: FSUIPCVarsRequest = new FSUIPCVarsRequest(Commands.VarsDeclare);
            request.name = group.name;

            // Add variables
            group.variables.forEach(inputVariable =>
            {
                let varRequest = new FSUIPCVarDefinition(inputVariable.Name)
                request.vars!.push(varRequest);
            });

            // Configure await
            let timeout = setTimeout(() => {
                Logging.LogTrace(`Request for variable group with name ${group.name} timed out.`)
                reject(`Variable group '${group.name}' creation was not confirmed in a timely manner.`)
            }, 5000);

            let onResponse: (response: FSUIPCResponse) => any = (r) => {
                if (r.name != group.name)
                {
                    return;
                }

                clearTimeout(timeout);
                Logging.LogTrace(`Got response for request for variable group with name ${group.name} with success: '${r.success}'`)

                this.responseHandler.OnVarDeclare = this.responseHandler.OnVarDeclare.filter(it => it !== onResponse)

                if (r.success == null || !r.success)
                {
                    reject(`Variable group '${group.name}' creation was not successfully created : (${r.errorCode}) ${r.errorMessage} `)
                } else
                {
                    resolve(null);
                }
            };

            this.responseHandler.OnVarDeclare.push(onResponse)

            this.ws.SendNamedRequest(request, this.responseHandler);
        });
    }

    public ForAllGroups(doAction: (group: VariableGroup) => void): void
    {
        for (let variableGroup of this.variableGroups)
        {
            doAction(variableGroup)
        }
    }

    private AssertGroupKnown(name: string)
    {
        if (!this.variableGroups.some(it => it.name == name))
        {
            throw new Error("Variable group '" + name + "' unknown to this manager. Was it registered?")
        }

        Logging.LogTrace(`Asserted group with name ${name} is known.`)
    }

    private DeleteGroupCore(name: nbl<string>)
    {
        if (name == null)
        {
            return;
        }

        let groupToRemove = this.GetGroup(name);
        if (groupToRemove == undefined) {
            return;
        }

        Logging.LogTrace(`Forgetting known group ${name}`);
        this.variableGroups = this.variableGroups.filter((it) => it != groupToRemove);
    }
}

/**
 * Internal class to handle web service responses to variable groups.
 */
class VariableManagerDynamicResponseHandler extends DynamicResponseHandler
{
    OnVarRead: ((response: FSUIPCVarsResponse) => any) | null = null;
    OnVarRemove: ((response: FSUIPCVarsResponse) => any) | null = null;
    OnVarDeclare: ((response: FSUIPCResponse) => any)[] = [];

    constructor()
    {
        super();

        super.On(Commands.VarsDeclare, this.HandleVarsDeclare.bind(this))
        super.On(Commands.VarsRead, this.HandleVarsRead.bind(this))
        super.On(Commands.VarsRemove, this.HandleVarsRemove.bind(this))
    }

    private HandleVarsRead(response: FSUIPCVarsResponse)
    {
        this.OnVarRead?.(response);
    }

    private HandleVarsDeclare(response: FSUIPCResponse)
    {
        for (let onVarDeclareElement of this.OnVarDeclare) {
            onVarDeclareElement(response);
        }
    }

    private HandleVarsRemove(response: FSUIPCVarsResponse)
    {
        FSUIPCResponse.AssertSuccess(response, "Failed to delete variable group.")
        this.OnVarRemove?.(response);
    }
}