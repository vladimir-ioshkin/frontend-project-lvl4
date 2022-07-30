import { createSelector, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { getDataRequest } from '../thunks/index.js';
import { currentChannelIdSelector } from './channels.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataRequest.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const currentChannelMessagesSelector = createSelector(
  selectors.selectAll,
  currentChannelIdSelector,
  (messages, currentChannelId) => messages.filter(
    ({ channelId }) => currentChannelId === channelId,
  ),
);
export default messagesSlice.reducer;
