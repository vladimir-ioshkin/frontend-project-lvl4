export interface IRollbarConfig {
  accessToken: string;
  environment: string;
}

export type SocketAction = (data: any, callback: any) => void;

export interface ISocketActions {
  [p: string]: SocketAction;
}

export interface AppProps {
  actions: ISocketActions;
  rollbarConfig: IRollbarConfig;
}
