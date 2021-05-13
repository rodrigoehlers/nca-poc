import * as vscode from 'vscode';
import { getAssignmentFromJSON } from '../serialization';

const handleOpenAssignmentView = () => {
  const { activeTextEditor } = vscode.window;

  if (!activeTextEditor) {
    vscode.window.showErrorMessage('Focus an assignment file before calling this command.');
  } else {
    const { document } = activeTextEditor;
    const content = document.getText();

    try {
      const assignment: NCA.Assignment = getAssignmentFromJSON(content);
      console.log(assignment.id);
    } catch (error) {
      vscode.window.showErrorMessage(error.message);
    }
  }
};

export default handleOpenAssignmentView;
