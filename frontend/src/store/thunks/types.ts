import { Channel, Message } from '../../types';

export interface DataResponse {
  channels: Channel[];
  messages: Message[];
}
