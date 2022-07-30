/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AUTH_ERROR_CODE } from '../../constants.js';
import getDataRequest from '../thunks/getDataRequest.js';

const initialState = {
  lng: 'ru',
  isLoading: false,
  errorCode: '',
  error: null,
};

const applicationStatusSlice = createSlice({
  name: 'applicationStatus',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataRequest.pending, (state) => {
        state.isLoading = true;
        state.errorCode = '';
      })
      .addCase(getDataRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        if (error.message.includes(AUTH_ERROR_CODE)) {
          state.errorCode = AUTH_ERROR_CODE;
          return;
        }
        state.errorCode = 'errors.server';
        state.error = error;
      })
      .addCase(getDataRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.errorCode = '';
      });
  },
});

export const { actions } = applicationStatusSlice;
export const isLoadingSelector = (state) => state.applicationStatus.isLoading;
export const errorCodeSelector = (state) => state.applicationStatus.errorCode;
export const errorSelector = (state) => state.applicationStatus.error;
export default applicationStatusSlice.reducer;
