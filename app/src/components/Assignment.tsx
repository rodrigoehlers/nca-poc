import React, { EventHandler, FormEventHandler, useEffect, useRef } from 'react';
import Task from './Task';

export interface AssignmentProps {
  assignment: NCA.Assignment;
}

const vscode = acquireVsCodeApi();

const Assignment: React.FC<AssignmentProps> = (props) => {
  const { assignment } = props;

  const handleSendResponseToExtension = (response: NCA.AssignmentResponse) => {
    console.log(JSON.stringify(response, null, 2));
    vscode.postMessage(response);
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
    <div>
      <h1>{assignment.title}</h1>
      <form onSubmit={handleSubmit}>
        {assignment.tasks.map(handleRenderTask)}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Assignment;
