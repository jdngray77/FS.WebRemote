# FS.WebRemote

FS.WebRemote is a part of our FS project.

It's a (getting started) TypeScript based web application designed to provide a web-based remote interface for flight simulation, similar to the [a32nx remote project](https://github.com/paulalexandrow/a32nx-webremote)

We're mostly just doing this because we're bored lol.

## Current status:
Back-end for talking to the sim is looking great ✔

Front-end is still in pre-development ⏰

## Features

- **Real-time Flight Sim Interaction**: Control and monitor your flight simulator remotely via a web browser.
- **Cross-Platform Access**: *should* work in any modern web browser!
- **FSUIPC Integration**:

## Planned features
- **Hosted or Unhosted**: The web app can be hosted for remote access, or a remote user can download a copy and open it in a browser with no web-server set-up needed. 
- **Customizable UI**: Tailor the remote interface to suit your personal preferences or specific flight needs.
- **Lightweight and Fast**: Built with TypeScript for high performance and maintainability.

## Prerequisites

Before setting up FS.WebRemote, ensure you have the following:

1. **Flight Simulator**: A compatible flight simulator with FSUIPC installed. (Currently only MSFS 2020 has been verified. Feel free to test others for us!!)
2. **FSUIPC Web Socket Server**: Ensure it is configured and running to enable communication.

## Installation

1. Download the release
2. TODO :)

## Building

TODO 

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the application:
   - Update the `config.json` file with the necessary FSUIPC Web Remote connection details.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Launch your flight simulator and ensure FSUIPC Web Remote is running.
2. Open FS.WebRemote in your preferred web browser.
3. Use the interface to control and monitor various flight simulator features remotely.

## Project Structure

TODO

## Contributing

Contributions are welcome! If you would like to improve FS.WebRemote, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Describe your feature or fix"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

TODO

## Acknowledgements

- [Ellie](https://github.com/elliescript)

- [FSUIPC Web Remote](https://www.fsuipc.com/) for providing the foundational API.
- Inspiration from the [a32nx remote project](https://github.com/flybywiresim/a32nx).
