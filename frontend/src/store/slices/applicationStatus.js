import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getData } from './channels.js';

const initialState = {
  lng: 'ru',
  isLoading: false,
  errorCode: '',
};

const applicationStatusSlice = createSlice({
  name: 'applicationStatus',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
        state.errorCode = '';
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message.includes('401')) {
          state.errorCode = 'errors.auth';
          return;
        }
        state.errorCode = 'errors.server';
      })
      .addCase(getData.fulfilled, (state) => {
        state.isLoading = false;
        state.errorCode = '';
      });
  },
});

export const { actions } = applicationStatusSlice;
export const isLoadingSelector = createSelector((state) => state.applicationStatus.isLoading);
export const errorCodeSelector = createSelector((state) => state.applicationStatus.errorCode);
export default applicationStatusSlice.reducer;
