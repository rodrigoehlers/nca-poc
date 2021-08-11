import React, { FormEventHandler } from 'react';
import { NCA } from '@/types/nca';
import Task from './Task';
import { LinkMessage, LinkMessageType } from '@/types/link';

export interface AssignmentProps {
  vscode: any;
  assignment: NCA.Assignment;
}

const Assignment: React.FC<AssignmentProps> = (props) => {
  const { vscode, assignment } = props;

  const handleSendResponseToExtension = (response: NCA.AssignmentResponse) => {
    const message: LinkMessage = {
      type: LinkMessageType.POST_RESPONSE,
      payload: response,
    };

    vscode.postMessage(message);
  };

  const handleBuildResponseFromFormData = (data: FormData) => {
    const taskIds = assignment.tasks.map(({ id }) => id);
    const taskTypeMapping = assignment.tasks.reduce<{ [key: string]: NCA.TaskType }>(
      (prev, { id, type }) => ({ ...prev, [id]: type as NCA.TaskType }),
      {}
    );

    const response: NCA.AssignmentResponse = {
      id: assignment.id,
      tasks: taskIds.map((id) => {
        const type: NCA.TaskType = taskTypeMapping[id];
        const isChoiceTask = type !== 'text';

        const values = data.getAll(id);
        return { id, [isChoiceTask ? 'values' : 'value']: isChoiceTask ? values : values[0] };
      }),
    };

    handleSendResponseToExtension(response);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    handleBuildResponseFromFormData(data);
  };

  const handleRenderTask = (task: NCA.Task) => <Task key={task.id} task={task} />;

  return (
    <>
      <h1>{assignment.title}</h1>
      <form onSubmit={handleSubmit}>
        {assignment.tasks.map(handleRenderTask)}
        <div className="submit-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Assignment;
