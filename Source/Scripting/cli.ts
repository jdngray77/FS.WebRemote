import readlinePromises from 'node:readline/promises';
import {FssVm} from "./fssVm";
import {FSUIPC} from "../FSUIPC/fsuipc";
import {Logging} from "../Utility/Logging";

// Create an interface for reading from standard input
const rl = readlinePromises.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Loop reading input until 'exit' is typed
async function main(): Promise<void> {

	let exit = false;

	let ws = new FSUIPC()
	await ws.ConnectAsync();

	let vm = new FssVm(ws);
	await vm.Init();

	while (!exit)
	{
		let input = await rl.question('Enter something (type "exit" to quit): ');

		if (input.toLowerCase() === 'exit') {
			console.log('Exiting...');
			exit = true;
			rl.close();
		} else {
			let result : boolean = await vm.executeStatement(input);
			Logging.Log(`Success : ${result}`)
		}
	}
}

main()
