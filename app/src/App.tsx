import React, { useEffect, useState } from 'react';
import Assignment from './components/Assignment';

const App: React.FC = () => {
  const [assignment, setAssignment] = useState<any>();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      setAssignment(event.data);
    };
    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  });

  return <>{assignment ? <Assignment assignment={assignment} /> : null}</>;
};

export default App;
