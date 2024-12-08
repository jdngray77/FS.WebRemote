# FS.FsuipcClient.TS

The FSUIPC client is a web socket client for [FSUIPC Web Socket Server](http://fsuipcwebsockets.paulhenty.com/) for [FSUIPC](https://www.fsuipc.com/) written in [TypeScript](https://www.typescriptlang.org/).


## Basic usage

### Create a client

To get started, create an instance of `fsuipc.ts`

```TypeScript
  const fsuipc: IFSUIPC = new FSUIPC();
```

Or, in development environments where the simulator is not running, the shim may be used:

```typescript
  const fsuipc: IFSUIPC = new FSUIPCShim();
```

The shim accepts variable declarations, and for every update interval will randomly assign data to the variables to simulate variables constantly changing within the simulator.

### Connect to FSUIPC Web Socket Server

To connect, await `ConnectAsync`, providing the URI to the web socket as displayed in FSUIPC Web Socket Server's interface.

```typescript
try {
	await fsuipc.ConnectAsync('ws://localhost:2048/fsuipc/');
} catch (e)
{
	Logging.LogError("oops, couldn't connect!")
	return;
}
```

This promise will timeout after 5 seconds if no connection is made, or will throw faster the websocket reports failure to connect.

### Wrapped API usage (`VariableManager`) (Recommended)

The intended use-case for this client is to be used with the other objects in this library - primarily, `VariableManager`.

`VariableManager` will wrap the API to provide an easy inferface to define and monitor variables.

The variable manager can be created like so

```typescript
let variableManger = new VariableManager(fsuipc);
```

We can then use the variable manager to define a logical group of variables that would be sensical to poll and monitor together - i.e variables pertaining to a single panel in the aircraft.

```typescript
let elecPanel: VariableGroup = await variableManger.CreateVariableGroupAsync(
            "ELEC Panel",
            new SimVariable("PRK BRK", "A32NX_PARK_BRAKE_LEVER_POS")
            );
```

Note that after creation of the variable group, the data of the variables will be read and accessible via the returned `VariableGroup` object. This object will continue to updated later once we start polling.

We can then add an update handler to the group to listen for these future variable changes

```typescript
elecPanel.OnUpdate(it =>
{
    // Handle updates for this particular group
})
```

And begin polling for changes at regular intervals.

```typescript
variableManger.StartVariableGroupPolling(elecPanel);
```

The default polling frequency is 2 seconds, but you can provide your own frequency in milliseconds.

```typescript
variableManger.StartVariableGroupPolling(elecPanel, 1000);
```

As well as listening for updates to this specific group, we can also add a global handler which will react to changes to *any* group - if that's useful for you application.

```typescript
  // Listen globally for updates
  variableManger.OnUpdate(it => 
    {
        // Handle updates, could be any variable group.
    })
```

#### REMEMBER TO TEAR-DOWN!

For long living applications, you should really only be polling for variable groups that matter for your current scenario. Eg in FS.WebRemote, we begin polling when a panel is visible to the user, and stop polling when it is no longer visible to them.

Say you're making a checklist application - You should only really be checking for variables pertaining to the checklist the user is currently viewing.

So, when updates are not required - make sure you stop polling

> This functionality is not implemented. See [issue 10](https://github.com/jdngray77/FS.WebRemote/issues/10).

### Direct API usage (not recommended)

Once connected, and if you should wish, the client may be used directly to communicate with the web socket server using it's [API](http://fsuipcwebsockets.paulhenty.com/#cmdabout). **This is not the intended usage for consumers, and places all the responsibility for managing and making the calls onto you, as the consumer!**

 > Note: I intend to change this API in the future, wrapping all the web service calls in typescript. See [issue 9](https://github.com/jdngray77/FS.WebRemote/issues/9).

These calls may be made asynchronously:

```typescript
let response: Response = await fsuipc.SendRequestAsync(new Request(Commands.AboutRead));
console.log(response);
```

Or non-asynchronously, using a callback:

```typescript
fsuipc.SendRequest(
	new Request(Commands.AboutRead),
	(r: Response) => {
		console.log(r)
	}
);
```

And (in the future when more reponse models are added) the reponse models may be specified.

```typescript
let response: AboutResponse = await fsuipc.SendRequestAsync<AboutResponse>(new Request(Commands.AboutRead));

console.log(response);
```