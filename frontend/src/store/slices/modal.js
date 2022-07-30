/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  channelData: {
    action: 'add',
    id: null,
    name: '',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.channelData = {
        ...initialState.channelData,
        ...payload,
      };
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalChannelSelector = (state) => state.modal.channelData;
export const modalIsOpenSelector = (state) => state.modal.isOpen;
export default modalSlice.reducer;
