export interface Channel {
  name: string;
  removable: boolean;
  id: number;
}

export interface Message {
  body: string;
  channelId: number;
  id: number;
  username: string;
}

export enum ErrorCodes {
  AUTH = '401',
  CONFLICT = '409',
}

export enum ModalActions {
  ADD = 'add',
  REMOVE = 'remove',
  RENAME = 'rename',
}
