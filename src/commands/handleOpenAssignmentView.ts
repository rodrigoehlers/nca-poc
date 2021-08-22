import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { NCA } from '../../types/nca';
import { getAssignmentFromJSON } from '../serialization';
import { handleGetTextFromActiveEditor } from '../utils';
import AssignmentService from '../service/AssignmentService';

const isProduction = process.env.__NCA_POC_ENV === 'production';

const handleOpenAssignmentView = (context: vscode.ExtensionContext) => {
  // Get and parse content
  const [filePath, content] = handleGetTextFromActiveEditor();

  if (!filePath || !content) {
    vscode.window.showErrorMessage('We had some trouble reading your focused file.');
    return;
  }

  try {
    const assignment: NCA.Assignment = getAssignmentFromJSON(content);

    const localResourceRoots: vscode.Uri[] = [];
    if (!isProduction) {
      localResourceRoots.push(vscode.Uri.parse('http://localhost:3000'));
    } else {
      localResourceRoots.push(vscode.Uri.file(path.join(context.extensionPath, 'out', 'dist')));
      localResourceRoots.push(vscode.Uri.file(path.join(context.extensionPath, 'out', 'dist', 'assets')));
    }

    // Open panel
    const panel = vscode.window.createWebviewPanel(
      `assignment-view-${assignment.id}`,
      assignment.title,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        // TODO: Add production path.
        localResourceRoots,
        retainContextWhenHidden: true,
      }
    );

    let html;

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
      html = withPreambleFix;
    } else {
      const mainOnDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'out', 'dist', 'index.html'));
      const file = fs.readFileSync(mainOnDiskPath.fsPath, 'utf8');
      html = file;

      const regex: RegExp = /(?:src|href)="(.+\.(?:js|css))"/g;
      for (const [_, src] of html.matchAll(regex)) {
        const parts = src.split('/');
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'out', 'dist', ...parts));
        const url = panel.webview.asWebviewUri(onDiskPath);
        html = html.replace(src, url.toString());
      }
    }

    panel.webview.html = html;

    // Setup communication
    const assignmentService = new AssignmentService(filePath, assignment, panel.webview);
    panel.webview.onDidReceiveMessage(assignmentService.handleMessage, null, context.subscriptions);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};

const handleOpenAssignmentViewFactory = (context: vscode.ExtensionContext) => () => handleOpenAssignmentView(context);

export default handleOpenAssignmentViewFactory;
