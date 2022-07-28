import { configureStore } from '@reduxjs/toolkit';
import applicationStatusReducer from './slices/applicationStatus.js';
import channelsReducer from './slices/channels.js';
import messagesReducer from './slices/messages.js';
import modalReducer from './slices/modal.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    applicationStatus: applicationStatusReducer,
    modal: modalReducer,
  },
});
