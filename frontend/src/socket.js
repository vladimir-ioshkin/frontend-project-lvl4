import { useContext } from 'react';
import { io } from 'socket.io-client';
import { CurrentChannelContext } from './contexts/CurrentChannelContext.js';
import { addMessage } from './store/slices/messages.js';
import { addChannel, removeChannel, renameChannel } from './store/slices/channels';
import store from './store';

export const initSocket = () => {
  const { currentChannelId, setDefaultChannel } = useContext(CurrentChannelContext);
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    if (currentChannelId === id) {
      setDefaultChannel();
    }
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(renameChannel({ id, changes: { name } }));
  });

  const addMessageSocket = (data, callback) => {
    socket.emit('newMessage', data, callback);
  };

  const addChannelSocket = (data, callback) => {
    socket.emit('newChannel', data, callback);
  };

  const removeChannelSocket = (data, callback) => {
    socket.emit('removeChannel', data, callback);
  };

  const renameChannelSocket = (data, callback) => {
    socket.emit('renameChannel', data, callback);
  };

  return {
    addMessageSocket,
    addChannelSocket,
    removeChannelSocket,
    renameChannelSocket,
  };
};
