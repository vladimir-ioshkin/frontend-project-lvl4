import { createSelector, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { getData } from './channels.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const messagesByChannelIdSelector = (currentChannelId) => createSelector(
  selectors.selectAll,
  (messages) => messages.filter(({ channelId }) => currentChannelId === channelId)
);
export default messagesSlice.reducer;
