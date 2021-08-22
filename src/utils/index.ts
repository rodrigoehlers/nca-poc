import * as vscode from 'vscode';

export const handleGetTextFromActiveEditor = (): [path: string, content: string] | [null, null] => {
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
