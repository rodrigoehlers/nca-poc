# nca-poc

This extension was built as part of a bachelor thesis to demonstrate the extensibility of Eclipse Che through the support of Visual Studio Code Extensions. It focuses on No-Code Assignments and the rendering of a GUI to support user input.

## Features

The extension provides a command to open a currently focused file in a GUI (Assignment View). After submitting results through the GUI (Assignment View), it produces an output file containing the results.

## Requirements

There are no external requirements to use the extension.

## Code Structure

The extension source code is split in two parts; the __app part__ (GUI) and the __extension part__.

The __app part__ handles rendering an assignment, user input and communication with the extension part.

The __extension part__ handles adding a command to open the app part, parsing assignments in JSON format, errors and communication with the app part.

## General Development

There are a few `npm` scripts in `package.json` that are relevant for development purposes.

1. `ext:build:watch`: Calls `ext:build:dev` on file changes inside of the `src` directory, which in turn runs the TypeScript compiler `tsc` using the development config file `src/tsconfig.development.json`. This compiles TypeScript code from the `src` to the `out` folder.
2. `ext:dev:watch`: Calls `ext:dev` on file changes inside of the `out` matching only files with `.development` in their file name. `ext:dev` runs two scripts
    1. `ext:dev:mv`: Moves (renames) `extension.development.js` and `extension.development.js.map` to `extension.js` and `extension.js.map` respectively.
    2. `ext:dev:rm`: Removes `.development` from the last line of the file content of both `extension.js` and `extension.js.map`.
3. `app:watch`: Runs the UI bundler [Vite](https://vitejs.dev).

Instead of running all three tasks by hand, it is also possible to run them as preLaunchTasks for a Visual Studio Code run configuration. However, this requires using Visual Studio code for development.

## Release Notes

### 1.0.0

Work in progress.
