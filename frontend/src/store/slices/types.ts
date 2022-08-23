import { EntityState } from '@reduxjs/toolkit';
import { Channel, Message } from '../../types';

export interface ChannelsState extends EntityState<Channel> {
  currentChannelId: number | null;
}

export interface MessagesState extends EntityState<Message> {}

export interface ChannelData {
  action: string;
  id: number | null;
  name: string;
}

export interface ModalState {
  isOpen: boolean;
  channelData: ChannelData;
}

export interface RootState {
  channels: ChannelsState;
  messages: MessagesState;
  modal: ModalState;
}
