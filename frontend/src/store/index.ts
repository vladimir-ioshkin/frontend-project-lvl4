import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channels';
import messagesReducer from './slices/messages';
import modalReducer from './slices/modal';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
