import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getAssignmentFromJSON } from '../serialization';

const isProduction = process.env.NODE_ENV === 'production';

const handleOpenAssignmentView = () => {
  const { activeTextEditor } = vscode.window;

  if (!activeTextEditor) {
    vscode.window.showErrorMessage('Focus an assignment file before calling this command.');
  } else {
    const { document } = activeTextEditor;
    const content = document.getText();

    try {
      const assignment: NCA.Assignment = getAssignmentFromJSON(content);
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
        const file = fs.readFileSync(path.resolve(__dirname, '../../app/index.html'), { encoding: 'utf8' });
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
      }
    } catch (error) {
      vscode.window.showErrorMessage(error.message);
    }
  }
};

export default handleOpenAssignmentView;
