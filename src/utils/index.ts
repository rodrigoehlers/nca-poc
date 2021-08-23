import * as vscode from 'vscode';

export const handleGetTextFromActiveEditor = (): [fileName: string, path: string, content: string] => {
  const { activeTextEditor } = vscode.window;

  if (!activeTextEditor) {
    throw new Error('No focused file in editor.');
  } else {
    const { document } = activeTextEditor;
    const uri = document.uri;
    return [document.fileName, uri.path, document.getText()];
  }
};
