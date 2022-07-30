import { io } from 'socket.io-client';
import { addMessage } from './store/slices/messages.js';
import {
  addChannel, removeChannel, renameChannel, setDefaultChannel,
} from './store/slices/channels';
import store from './store';

const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));

    const { channels: { currentChannelId } } = store.getState();

    if (currentChannelId === id) {
      store.dispatch(setDefaultChannel());
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

export default initSocket;
