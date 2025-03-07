// src/utils/webSocketService.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleNotification, addNotification } from '../app/slices/notificationSlice';

const useWebSocket = (url) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  const connectSocket = () => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      newSocket.send(JSON.stringify({ type: 'connectUser' }));
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      switch (message.type) {
        case 'connectionConfirmed':
          console.log('Connection confirmed');
          break;
        case 'newNotification':
          dispatch(addNotification(message.payload));
          dispatch(toggleNotification());
          console.log('New notification received:', message.payload);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Attempt to reconnect after 5 seconds
      setTimeout(connectSocket, 5000);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
      // Attempt to reconnect after 5 seconds
      setTimeout(connectSocket, 5000);
    };

    setSocket(newSocket);
  };

  useEffect(() => {
    connectSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return socket;
};

export default useWebSocket;