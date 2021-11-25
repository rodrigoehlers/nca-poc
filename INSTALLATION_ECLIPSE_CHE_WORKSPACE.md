# Installation on Eclipse Che and usage in a Workspace

To install the extension on Eclipse Che it is needed to either register the extension through customization of the Eclipse Che Plugin Registry or make it available on a static file server the Eclipse Che installation has access to. We're going to focus on the latter in these instructions.

## Using a static file server

It is needed to make the following files available on your static file server:
  - A `.vsix` binary of the extension
  - A `plugin.yaml` file referencing the binary with a url Eclipse Che can access

### The binary

Use the `.vsix` file provided in the root of this project. If there is no `.vsix` binary in the root of this project, make sure to read `README.md` to learn how to build the code and compile the binary. The `.vsix` binary of the extension should be accessible on the static file server by Eclipse Che. Its url is needed for the `plugin.yaml` file.

### The plugin definition

The following is an example of a valid `plugin.yaml` file that defines the Eclipse Che Plugin:
```yaml
apiVersion: v2
publisher: rodrigoehlers
name: nca-poc
version: 1.0.0
type: VS Code extension
displayName: No-Code Assignments - Proof of Concept
title: No-Code Assignments - Proof of Concept
description: Renders a GUI for No-Code Assignments.
icon: https://raw.githubusercontent.com/redhat-developer/codeready-workspaces/crw-2-rhel-8/dependencies/che-plugin-registry/resources/images/default.svg?sanitize=true
repository: https://github.com/rodrigoehlers/nca-poc
category: Language
firstPublicationDate: '2021-09-10'
spec:
  extensions:
  - "https://static.file.server/path/to/the/extension/binary.vsix" 
latestUpdateDate: "2021-09-10"
```

It is needed to make this file accessible on the static file server by Eclipse Che as well. A few things can be customized in this `plugin.yaml` file with the most important being the url `https://static.file.server/path/to/the/extension/binary.vsix` of `spec.extensions`. Replace this url with the url pointing to the actual `.vsix` binary of the extension.

If you don't have access to a static file server, you can use a GitHub Gist to make your plugin files available. Eclipse Che provides [a detailed explanation](https://www.eclipse.org/che/docs/che-7/end-user-guide/testing-a-visual-studio-code-extension-in-che/) on how this process works.

Once the files are available it is needed to create a workspace and adding the extension as a component. To do this, you can copy one of the default workspaces and edit its `devfile.yaml`.

Add the following to the `components` section of the `devfile.yaml`:
```yaml
components:
  - type: chePlugin
    reference: "https://static.file.server/path/to/the/extension/plugin.yaml"
```

Again it is needed to replace the url `https://static.file.server/path/to/the/extension/plugin.yaml` inside the component we just added with the actual url pointing to the `plugin.yaml` of the extension.

After this is done, the extension should be available, when starting the workspace.

## Using a customized Eclipse Che Registry

If you instead want to try and customize the Eclipse Che Plugin Registry you can [follow this guide](https://www.eclipse.org/che/docs/che-7/administration-guide/customizing-the-registries/).
