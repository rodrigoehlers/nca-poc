import React from 'react';
import Option from './Option';

export interface MultipleChoiceTaskBodyProps {
  id: string;
  options: NCA.Option[];
}

const MultipleChoiceTaskBody: React.FC<MultipleChoiceTaskBodyProps> = (props) => {
  const { id, options } = props;

  const handleRenderOption = (option: NCA.Option) => {
    return <Option key={option.id} taskId={id} option={option} type="checkbox" />;
  };

  return <div>{options.map(handleRenderOption)}</div>;
};

export default MultipleChoiceTaskBody;
