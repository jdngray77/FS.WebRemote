import { FSUIPC } from "./FSUIPC/fsuipc";
import { Commands } from "./FSUIPC/Models/Request/Commands";
import { FSUIPCResponse as Response } from './FSUIPC/Models/Response/FSUIPCResponse'
import { FSUIPCRequest as Request } from './FSUIPC/Models/Request/FSUIPCRequest'
import { Logging } from "./Utility/Logging";
import { VariableManager } from "./FSUIPC/Variables/VariableManager";
import { SimVariable } from "./FSUIPC/Variables/SimVariable";
import { VariableGroup } from "./FSUIPC/VariableGroup";



async function main(): Promise<void> {

  const fsuipc: FSUIPC = new FSUIPC();
  fsuipc.Connect();

  // temp delay for async connection, give it time to connect.
  const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
  await delay(2000);

  // Read & print server info
  fsuipc.SendRequest(
    new Request(Commands.AboutRead),
    (r: Response) => {
        // console.log(r)
    }
  );

  // Create some variables! (haven't done offsets yet)
  let variableManger = new VariableManager(fsuipc);

  // Listen globally for updates
  variableManger.OnUpdate(it => 
    {
        // Handle updates, could be any variable group.
    })

  // Variable group : Option 1 - automatic
  let elecPanel: VariableGroup = await variableManger.CreateVariableGroupAsync(
    "ELEC Panel",
    new SimVariable("PRK BRK", "A32NX_PARK_BRAKE_LEVER_POS"),
  );

  variableManger.StartVariableGroupPolling(elecPanel);


  // // Variable group : Option 2 - DIY
  // let hydPanel: VariableGroup = new VariableGroup(
  //  "HYD Panel",
  //  [
  //   new SimVariable("a32nx_pump_or_something"),
  //   new SimVariable("a32nx_pump_2", "0x1234")
  //  ]
  // )

  //variableManger.AddVariableGroup(hydPanel);

  // listen to particular group updates
  elecPanel.OnUpdate(it => 
    {
        // Handle updates, could be any variable group.
    })


  // dispose of when no longer needed. 
  // stops listening for variable updates + unregisters all variables.
  //variableManger.Dispose();
}

main();