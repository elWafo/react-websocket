import React from 'react';
import PropTypes from 'prop-types';
import useWebsocket from './useWebsocket';

const WebsocketComponent = ({ url, onOpen, onMessage, onError, onClose, reconnect }) => {
  const { socketStatus } = useWebsocket({
    url,
    onOpen,
    onMessage,
    onError,
    onClose,
    reconnect
  });

  console.log('Socket status: ', socketStatus);

  return <React.Fragment></React.Fragment>;
};

WebsocketComponent.propTypes = {
  url: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  onMessage: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func,
  reconnect: PropTypes.bool,
};

WebsocketComponent.defaultProps = {
  onOpen: f => f,
  onMessage: f => f,
  onError: f => f,
  onClose: f => f,
  reconnect: true,
};

export default WebsocketComponent;
