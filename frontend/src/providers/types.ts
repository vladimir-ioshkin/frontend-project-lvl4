export type LogInType = ({ token, username }: { token: string; username: string }) => void;
export type LogOutType = () => void;
export type GetUsernameType = () => string;

export interface IAuthorizationValue {
  isLogged: boolean;
  logIn: LogInType;
  logOut: LogOutType;
  getUsername: GetUsernameType;
}
