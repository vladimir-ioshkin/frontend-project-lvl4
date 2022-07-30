import { configureStore } from '@reduxjs/toolkit';
import applicationStatusReducer from './slices/applicationStatus';
import channelsReducer from './slices/channels';
import messagesReducer from './slices/messages';
import modalReducer from './slices/modal';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    applicationStatus: applicationStatusReducer,
    modal: modalReducer,
  },
});
