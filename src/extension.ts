import * as vscode from 'vscode';
import handleOpenAssignmentView from './commands/handleOpenAssignmentView';

export function activate(context: vscode.ExtensionContext) {
  const openAssignmentViewDisposable = vscode.commands.registerCommand(
    'nca-poc.openAssignmentView',
    handleOpenAssignmentView
  );
  context.subscriptions.push(openAssignmentViewDisposable);
}

export function deactivate() {}
