import * as vscode from 'vscode';
import handleOpenAssignmentViewFactory from './commands/handleOpenAssignmentView';

export const activate = (context: vscode.ExtensionContext) => {
  const openAssignmentViewDisposable = vscode.commands.registerCommand(
    'nca-poc.openAssignmentView',
    handleOpenAssignmentViewFactory(context)
  );

  context.subscriptions.push(openAssignmentViewDisposable);
};

export const deactivate = () => {};
