import React from 'react';

/**
 * Options for the useSocket Hook.
 * @typedef {Object} wsOptions
 * @property {string} url - URL for the connection.
 * @property {function} onOpen - Function for the onopen event.
 * @property {function} onMessage - Function for the onmessage event.
 * @property {function} onError - Function for the onerror event.
 * @property {function} onClose - Function for the onclose event.
 * @property {boolean} reconnect - Bool to retry or not the connection.
 * @property {int} reconnectTime - Miliseconds to try reconnecting.
 */

/**
 * Custom hook to handle a ws connection.
 * @param {wsOptions} wsOptions Options for the websocket Hook
 */
const useWebsocket = (wsOptions) => {
  const [socketState, setSocketState] = React.useState(3);

  const socket = React.useRef({
    instance: null,
    open: function () {
      this.instance = new WebSocket(wsOptions.url);

      this.instance.onopen = (evt) => {
        setSocketState(this.instance.readyState);
        if (wsOptions.onOpen) { wsOptions.onOpen(evt, this.instance); }
      };
      this.instance.onerror = (err) => {
        if (wsOptions.onError) { wsOptions.onError(err); }
        // TODO: Test if this actually does something.
        if (err.code === 'ECONNREFUSED' && wsOptions.reconnect) {
          this.reconnect();
        }
      }
      this.instance.onclose = (evt) => {
        setSocketState(this.instance.readyState);
        if (wsOptions.onClose) { wsOptions.onClose(evt); }
        if (evt.code !== 1000 && wsOptions.reconnect) {
          this.reconnect();
        }
      };
      this.instance.onmessage = (data) => {
        if (wsOptions.onMessage) {
          wsOptions.onMessage(data, this.instance);
        }
      }
    },
    reconnect: function () {
      // this.instance.close();
      setTimeout(() => {
        this.open();
      }, wsOptions.reconnectTime || 1000);
    },
  })

  React.useEffect(() => {
    const ws = socket.current;
    ws.open();

    return () => {
      ws.instance.close();
    }
  }, []);

  return {
    socket: socket.current.instance,
    socketStatus: socketState,
    socketSend: socket.current.instance ? socket.current.instance.send : f => f,
  }
};

export default useWebsocket;
