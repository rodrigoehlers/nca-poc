import React, { useEffect, useState } from 'react';
import { LinkMessage, LinkMessageType } from '@/types/link';
import Assignment from './components/Assignment';

import './styles/style.css';

const vscode = acquireVsCodeApi();

const App: React.FC = () => {
  const [assignment, setAssignment] = useState<any>();

  // Setup message listener.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message: LinkMessage = event.data;
      const { type, payload } = message;
      switch (type) {
        case LinkMessageType.RESPONSE_GET_ASSIGNMENT:
          setAssignment(payload);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Request assignment.
  useEffect(() => {
    const message = {
      type: LinkMessageType.GET_ASSIGNMENT,
    };
    vscode.postMessage(message);
  }, []);

  return <>{assignment ? <Assignment vscode={vscode} assignment={assignment} /> : null}</>;
};

export default App;
