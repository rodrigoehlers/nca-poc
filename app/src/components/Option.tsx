import React from 'react';
import { NCA } from '@/types/nca';

export interface OptionProps {
  taskId: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] & ('radio' | 'checkbox');
  option: NCA.Option;
}

const Option: React.FC<OptionProps> = (props) => {
  const { taskId, type = 'radio', option } = props;

  return (
    <div>
      <input type={type} id={`${taskId}-${option.id}`} name={taskId} value={option.id} />
      <label htmlFor={`${taskId}-${option.id}`}>{option.label}</label>
    </div>
  );
};

export default Option;
