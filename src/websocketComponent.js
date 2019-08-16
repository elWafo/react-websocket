import React from 'react';
import useWebsocket from './useWebsocket';

const WebsocketComponent = () => {
  const { socket, socketStatus, socketSend } = useWebsocket({
    url: 'ws://127.0.0.1:8000',
  });

  const test = () => {
    console.log(socketStatus);
    console.log(socket);
  }

  const send = () => {
    socket.send('ayylmao');
  }

  return <React.Fragment>
    <button onClick={test}>A ver el socket</button>
    <button onClick={send}>Send ayylmao</button>
  </React.Fragment>;
};

export default WebsocketComponent;
