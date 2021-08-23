import * as vscode from 'vscode';

import { NCA } from '../../types/nca';
import { getAssignmentFromJSON } from '../serialization';
import { handleGetTextFromActiveEditor } from '../utils';
import AssignmentService from '../service/AssignmentService';
import UserInterfaceService from '../service/UserInterfaceService';

const handleOpenAssignmentView = (context: vscode.ExtensionContext) => {
  // Get and parse content
  let data: [fileName: string, path: string, content: string];
  try {
    data = handleGetTextFromActiveEditor();
  } catch (error) {
    vscode.window.showErrorMessage(`Could not read file: ${error.message}`);
    return;
  }

  const [fileName, filePath, content] = data;

  // Validate assignment file name.
  if (!AssignmentService.isAssignmentFileByFileName(fileName)) {
    vscode.window.showErrorMessage(`Invalid assignment file name. Should end with '.assignment.json'.`);
    return;
  }

  // Parse assignment
  let assignment: NCA.Assignment;
  try {
    assignment = getAssignmentFromJSON(content);
  } catch (error) {
    vscode.window.showErrorMessage(`Could not parse assignment: ${error.message}.`);
    return;
  }

  const localResourceRoots: vscode.Uri[] = UserInterfaceService.getLocalResourceRoots(context.extensionPath);

  // Open panel
  const panel = vscode.window.createWebviewPanel(
    `assignment-view-${assignment.id}`,
    assignment.title,
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots,
      retainContextWhenHidden: true,
    }
  );

  panel.webview.html = UserInterfaceService.getHTMLContent(context.extensionPath, panel);

  // Setup communication
  const assignmentService = new AssignmentService(filePath, assignment, panel.webview);
  panel.webview.onDidReceiveMessage(assignmentService.handleMessage, null, context.subscriptions);
};

const handleOpenAssignmentViewFactory = (context: vscode.ExtensionContext) => () => handleOpenAssignmentView(context);

export default handleOpenAssignmentViewFactory;
