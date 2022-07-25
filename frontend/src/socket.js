import { io } from 'socket.io-client';
import store from './store';
import { addMessage } from './store/slices/messages.js';

export const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  const sendMessage = (data, callback) => {
    socket.emit('newMessage', data, callback);
  };

  return {
    sendMessage,
  };
};
