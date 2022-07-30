/* eslint-disable no-param-reassign */
import { createSelector, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import getDataRequest from '../thunks/getDataRequest';
import { currentChannelIdSelector } from './channels';

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
