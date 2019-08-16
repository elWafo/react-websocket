import React from 'react'
import { withWebsocket } from '@wafo/react-websocket'

const UsingHOC = ({ socketSend, socketStatus }) => {
  React.useEffect(() => {
    if (socketStatus === 1) {
      console.log('The socket is open');
      socketSend("Ayylmao");
    } else if (socketStatus === 3) {
      console.log('The socket closed');
    }
  }, [socketStatus, socketSend]);

  return (
    <div>Ayylmao.</div>
  );
};

export default withWebsocket(
  UsingHOC,
  'ws://127.0.0.1:8000',
  () => { console.log('Socket on Open') }
);
