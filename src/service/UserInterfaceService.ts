import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This is set in 'extension.ts' or 'extension.development.ts'.
const isProduction = process.env.__NCA_POC_ENV === 'production';

class UserInterfaceService {
  static getHTMLContent(baseExtensionPath: string, panel: vscode.WebviewPanel): string {
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
      const mainOnDiskPath = vscode.Uri.file(path.join(baseExtensionPath, 'out', 'dist', 'index.html'));
      const file = fs.readFileSync(mainOnDiskPath.fsPath, 'utf8');
      html = file;

      const regex: RegExp = /(?:src|href)="(.+\.(?:js|css))"/g;
      for (const [_, src] of html.matchAll(regex)) {
        const parts = src.split('/');
        const onDiskPath = vscode.Uri.file(path.join(baseExtensionPath, 'out', 'dist', ...parts));
        const url = panel.webview.asWebviewUri(onDiskPath);
        html = html.replace(src, url.toString());
      }
    }

    return html;
  }

  static getLocalResourceRoots(baseExtensionPath: string): vscode.Uri[] {
    const localResourceRoots = [];
    if (!isProduction) {
      localResourceRoots.push(vscode.Uri.parse('http://localhost:3000'));
    } else {
      localResourceRoots.push(vscode.Uri.file(path.join(baseExtensionPath, 'out', 'dist')));
      localResourceRoots.push(vscode.Uri.file(path.join(baseExtensionPath, 'out', 'dist', 'assets')));
    }

    return localResourceRoots;
  }
}

export default UserInterfaceService;
