import { Socket } from 'socket.io-client';
import { addMessage } from './store/slices/messages';
import { addChannel, removeChannel, renameChannel } from './store/slices/channels';
import store from './store';
import { ISocketActions, SocketAction } from './components/types';
import { Channel, Message } from './types';

const initSocket = (socket: Socket): ISocketActions => {
  socket.on('newMessage', (payload: Message) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload: Channel) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', ({ id }: { id: number }) => {
    store.dispatch(removeChannel(id));
  });

  socket.on('renameChannel', ({ id, name }: { id: number; name: string }) => {
    store.dispatch(renameChannel({ id, changes: { name } }));
  });

  const addMessageSocket: SocketAction = (
    data: { body: string; channelId: number; username: string },
    callback: () => void,
  ) => {
    socket.emit('newMessage', data, callback);
  };

  const addChannelSocket: SocketAction = (
    data: { name: string; },
    callback: (obj: { data: { id: number }, status: string }) => void,
  ) => {
    socket.emit('newChannel', data, callback);
  };

  const removeChannelSocket: SocketAction = (
    data: { id: number; },
    callback: (obj: { status: string }) => void,
  ) => {
    socket.emit('removeChannel', data, callback);
  };

  const renameChannelSocket: SocketAction = (
    data: { id: number; name: string },
    callback: (obj: { status: string }) => void,
  ) => {
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
