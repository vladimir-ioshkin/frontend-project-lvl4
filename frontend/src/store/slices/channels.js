import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '../../routes.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const getData = createAsyncThunk(
  'channels/getData',
  async () => {
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const response = await axios.get(apiRoutes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
