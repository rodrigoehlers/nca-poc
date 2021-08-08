import React from 'react';
import TextTaskBody from './TextTaskBody';
import SingleChoiceTaskBody from './SingleChoiceTaskBody';
import MultipleChoiceTaskBody from './MultipleChoiceTaskBody';

export interface TaskProps {
  task: NCA.Task;
}

const Task: React.FC<TaskProps> = (props) => {
  const { task } = props;

  return (
    <div>
      <h2>{task.title}</h2>
      {task.desc ? <p>{task.desc}</p> : null}
      {(() => {
        switch (task.type) {
          case 'text' as NCA.TaskType:
            return <TextTaskBody id={task.id} />;
          case 'single-choice' as NCA.TaskType:
            return <SingleChoiceTaskBody id={task.id} options={(task as NCA.SingleChoiceTask).options} />;
          case 'multiple-choice' as NCA.TaskType:
            return <MultipleChoiceTaskBody id={task.id} options={(task as NCA.SingleChoiceTask).options} />;
        }
      })()}
    </div>
  );
};

export default Task;
