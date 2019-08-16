import React from 'react'
import { WebsocketComponent } from '@wafo/react-websocket'

const UsingComponent = () => {
  return (
    <div>
      <span>Ayylmao</span>
      <WebsocketComponent
        url="ws://127.0.0.1:8000"
        // reconnect={false}
      />
    </div>
  );
};

export default UsingComponent;
