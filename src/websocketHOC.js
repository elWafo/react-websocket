import React from 'react';

function withWebSocket(WrappedComponent, url, onOpen, onMessage, onError, onClose) {
  return class Component extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        socketStatus: 0
      };
    }

    componentDidMount() {
      this.openSocket();
    }

    componentWillUnmount() {
      this.socket.close();
    }

    openSocket = () => {
      this.socket = new WebSocket(url);

      this.socket.onopen = (evt) => {
        this.setState({ socketStatus: 1 });
        if (onOpen) { onOpen(evt); }
      };

      this.socket.onmessage = onMessage ? onMessage : f => f;

      this.socket.onerror = (evt) => {
        this.setState({ socketStatus: 3 });
        if (onError) { onError(evt); }
      }

      this.socket.onclose = (evt) => {
        this.setState({ socketStatus: 3 });
        if (onClose) { onClose(evt); }
        this.openSocket();
      }
    }

    socketSend = (data) => {
      if (this.socket) {
        this.socket.send(data);
      }
    };

    render() {
      const socketStatus = this.socket ? this.socket.readyState : 0;

      return (<WrappedComponent
        {...this.props}
        socketSend={this.socketSend}
        socketStatus={socketStatus}
      />);
    }
  };
}

export default withWebSocket;