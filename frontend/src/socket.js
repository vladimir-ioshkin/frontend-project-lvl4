import { addMessage } from './store/slices/messages';
import { addChannel, removeChannel, renameChannel } from './store/slices/channels';
import store from './store';

const initSocket = (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
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
