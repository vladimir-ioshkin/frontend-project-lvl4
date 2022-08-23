/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  createEntityAdapter,
  EntityAdapter,
} from '@reduxjs/toolkit';
import { Channel } from '../../types';
import getDataRequest from '../thunks/getDataRequest';
import { DataResponse } from '../thunks/types';
import { ChannelsState, RootState } from './types';

const DEFAULT_CHANNEL_ID = 1;

const channelsAdapter: EntityAdapter<Channel> = createEntityAdapter<Channel>();

const initialState: ChannelsState = channelsAdapter.getInitialState({ currentChannelId: null });
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }: { payload: { id: number } }) => {
      state.currentChannelId = payload.id;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = DEFAULT_CHANNEL_ID;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataRequest.fulfilled, (state, { payload }: { payload: DataResponse }) => {
        channelsAdapter.addMany(state, payload.channels);
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
export const selectors = channelsAdapter.getSelectors(
  (state: RootState): ChannelsState => state.channels,
);
export const currentChannelIdSelector = (
  (state: RootState): number => state.channels.currentChannelId
);
export const currentChannelSelector = createSelector(
  (state: RootState) => state,
  currentChannelIdSelector,
  selectors.selectById,
);
export default channelsSlice.reducer;
