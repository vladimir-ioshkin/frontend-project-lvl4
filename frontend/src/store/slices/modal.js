import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  channel: {
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
      state.channel = {
        action: 'add',
        id: null,
        name: '',
        ...payload,
      };
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalChannelSelector = (state) => state.modal.channel;
export const modalIsOpenSelector = (state) => state.modal.isOpen;
export default modalSlice.reducer;
