import React, { ChangeEventHandler, useState } from 'react';

export interface TextTaskBodyProps {
  id: string;
}

const TextTaskBody: React.FC<TextTaskBodyProps> = (props) => {
  const { id } = props;

  const [response, setResponse] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { target } = event;
    setResponse(target.value);
  };

  return (
    <textarea
      id={id}
      name={id}
      placeholder="Enter your answer here..."
      rows={8}
      value={response}
      onChange={handleChange}
    />
  );
};

export default TextTaskBody;
