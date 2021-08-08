import React from 'react';
import Option from './Option';

export interface SingleChoiceTaskBodyProps {
  id: string;
  options: NCA.Option[];
}

const SingleChoiceTaskBody: React.FC<SingleChoiceTaskBodyProps> = (props) => {
  const { id, options } = props;

  const handleRenderOption = (option: NCA.Option) => {
    return <Option key={option.id} taskId={id} option={option} />;
  };

  return <div>{options.map(handleRenderOption)}</div>;
};

export default SingleChoiceTaskBody;
