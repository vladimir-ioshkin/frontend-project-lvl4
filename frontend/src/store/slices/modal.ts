/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ModalActions } from '../../types';
import { ChannelData, ModalState, RootState } from './types';

const initialState: ModalState = {
  isOpen: false,
  channelData: {
    action: ModalActions.ADD,
    id: null,
    name: '',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: { payload: Partial<ChannelData> }) => {
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
export const modalChannelSelector = (state: RootState): ChannelData => state.modal.channelData;
export const modalIsOpenSelector = (state: RootState): boolean => state.modal.isOpen;
export default modalSlice.reducer;
