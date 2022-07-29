import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { getDataRequest } from '../thunks/index.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataRequest.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
      });
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
