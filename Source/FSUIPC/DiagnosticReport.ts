import {VariableManager} from "./Variables/VariableManager";
import {table} from "table";
import type {TableUserConfig} from "table/dist/src/types/api";
import {FSUIPC} from "./fsuipc";

export class DiagnosticReport
{
	private managers: VariableManager[] = [];
	private clients: FSUIPC[] = [];

	public AddManager(manager: VariableManager)
	{
		this.managers.push(manager)
	}

	public AddClient(client: FSUIPC)
	{
		this.clients.push(client)
	}

	public CreateReport(): string
	{
		const empty = "";
		let output: string = empty;

		let clientCount: number = 0;
		for (let client of this.clients)
		{
			clientCount++;
			let config: TableUserConfig = {
				header: {
					content: `Client ${clientCount.toString()}`
				}
			};

			let Data = [
				["Address", client.GetAddress()],
				["Connected", client.IsConnected()],
				["Dynamic Handlers", client.GetDynamicHandlerCount()],
				["Handlers", client.GetHandlerCount()],
				["Messages sent", client.GetRequestsSent()],
				["Messages received", client.GetMessagesReceived()],
				["Messages failed to be handled", client.GetHandlingFailures()],
				["Server Info (at time of connection)", client.GetServerInfo()],
			]

			output += table(Data, config) + "\n";
		}

		var managerCount: number = 0;
		for (let manager of this.managers)
		{
			managerCount++;

			let config: TableUserConfig = {
				header: {
					content: `Manager ${managerCount.toString()}`
				}
			};

			let Data: string[][] = [];

			for (let group of manager.GetVariableGroups())
			{
				Data.push([`Group '${group.name}'`,empty,empty,empty])
				Data.push(["Friendly Name", "Name", "Offset", "Last Known Value"])

				for (let variable of group.variables)
				{
					Data.push([variable.FriendlyName, variable.Name, variable.Offset ?? empty, variable.LastKnownValue?.toString() ?? empty])
				}
			}

			output += table(Data, config) + "\n";
		}

		return output;
	}
}