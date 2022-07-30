/* eslint-disable no-param-reassign */
import { createSelector, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import getDataRequest from '../thunks/getDataRequest.js';

const DEFAULT_CHANNEL_ID = 1;

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: null });
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = DEFAULT_CHANNEL_ID;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataRequest.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
      });
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
  setDefaultChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const currentChannelIdSelector = (state) => state.channels.currentChannelId;
export const currentChannelSelector = createSelector(
  (state) => state,
  currentChannelIdSelector,
  selectors.selectById,
);
export default channelsSlice.reducer;
