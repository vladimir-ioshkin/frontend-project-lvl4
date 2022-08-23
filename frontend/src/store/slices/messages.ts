/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  createEntityAdapter,
  EntityAdapter,
} from '@reduxjs/toolkit';
import { Message } from '../../types';
import getDataRequest from '../thunks/getDataRequest';
import { currentChannelIdSelector } from './channels';
import { MessagesState, RootState } from './types';

const messagesAdapter: EntityAdapter<Message> = createEntityAdapter<Message>();

const initialState: MessagesState = messagesAdapter.getInitialState();

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
export const selectors = messagesAdapter.getSelectors(
  (state: RootState): MessagesState => state.messages,
);
export const currentChannelMessagesSelector = createSelector(
  selectors.selectAll,
  currentChannelIdSelector,
  (messages: Message[], currentChannelId: number): Message[] => messages.filter(
    ({ channelId }: { channelId: number }) => currentChannelId === channelId,
  ),
);
export default messagesSlice.reducer;
