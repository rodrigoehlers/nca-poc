import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { NCA } from '../../types/nca';

import { getAssignmentFromJSON } from '../serialization';
import AssignmentService from '../service/AssignmentService';

const isProduction = process.env.NODE_ENV === 'production';

const handleGetTextFromActiveEditor = (): [path: string, content: string] | [null, null] => {
  const { activeTextEditor } = vscode.window;

  if (!activeTextEditor) {
    vscode.window.showErrorMessage('Focus an assignment file before calling this command.');
    return [null, null];
  } else {
    const { document } = activeTextEditor;
    const uri = document.uri;
    return [uri.path, document.getText()];
  }
};

const handleOpenAssignmentView = (context: vscode.ExtensionContext) => {
  // Get and parse content
  const [filePath, content] = handleGetTextFromActiveEditor();

  if (!filePath || !content) {
    vscode.window.showErrorMessage('We had some trouble reading your focused file.');
    return;
  }

  try {
    const assignment: NCA.Assignment = getAssignmentFromJSON(content);
    // Open panel
    const panel = vscode.window.createWebviewPanel(
      `assignment-view-${assignment.id}`,
      assignment.title,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        // TODO: Add production path.
        localResourceRoots: [vscode.Uri.parse('http://localhost:3000')],
        retainContextWhenHidden: true,
      }
    );

    if (!isProduction) {
      const file = fs.readFileSync(path.resolve(__dirname, '../../../app/index.html'), { encoding: 'utf8' });
      const withLocalhost = file.replace(/(href|src)="\//gi, '$1="http://localhost:3000/');

      const preambleFix = `<script type="module">
import RefreshRuntime from 'http://localhost:3000/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.__vite_plugin_react_preamble_installed__ = true;
</script>
<div id="root"></div>`;

      const withPreambleFix = withLocalhost.replace('<div id="root"></div>', preambleFix);

      panel.webview.html = withPreambleFix;
    } else {
      // TODO: Anything in production?
    }

    // Setup communication
    const assignmentService = new AssignmentService(filePath, assignment, panel.webview);
    panel.webview.onDidReceiveMessage(assignmentService.handleMessage, null, context.subscriptions);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};

const handleOpenAssignmentViewFactory = (context: vscode.ExtensionContext) => () => handleOpenAssignmentView(context);

export default handleOpenAssignmentViewFactory;
