import { writeFile } from 'fs';
import { Link, LinkMessage, LinkMessageType } from '../../types/link';
import { NCA } from '../../types/nca';

export interface MessageHandler {
  handleMessage: (message: LinkMessage) => Promise<void> | void;
}

class AssignmentService implements MessageHandler {
  path: string;
  assignment: NCA.Assignment;
  link: Link;

  constructor(path: string, assignment: NCA.Assignment, link: Link) {
    this.path = path;
    this.assignment = assignment;
    this.link = link;

    this.handleMessage = this.handleMessage.bind(this);
  }

  /**
   * Returns whether a file name matches the assignment file file name specification.
   *
   * @param fileName File name to test.
   * @returns Whether the file name matched the specification
   */
  static isAssignmentFileByFileName(fileName: string) {
    return fileName.endsWith('.assignment.json');
  }

  /**
   * Returns a response file path based on the current assignment file path.
   *
   * @returns Response file path.
   */
  getResponsePath() {
    const parts = this.path.split('/');
    const fileName = parts.pop();
    const nextFileName = fileName!.replace(/\.assignment\.json$/, '.assignment.response.json');
    const nextPath = `${parts.join('/')}/${nextFileName}`;
    return nextPath;
  }

  /**
   * Message handler for communication with the UI.
   *
   * @param message Incoming message.
   */
  async handleMessage(message: LinkMessage) {
    const { type, payload } = message;
    switch (type) {
      case LinkMessageType.GET_ASSIGNMENT:
        {
          const message: LinkMessage = {
            type: LinkMessageType.RESPONSE_GET_ASSIGNMENT,
            payload: this.assignment,
          };

          this.link.postMessage(message);
        }
        break;
      case LinkMessageType.POST_RESPONSE:
        {
          const message: LinkMessage = {
            type: LinkMessageType.RESPONSE_POST_RESPONSE,
          };
          try {
            await new Promise<void>((res) =>
              writeFile(this.getResponsePath(), JSON.stringify(payload, null, 2), () => res())
            );
          } catch (error) {
            message.payload = error;
          }

          this.link.postMessage(message);
        }
        break;
    }
  }
}

export default AssignmentService;
