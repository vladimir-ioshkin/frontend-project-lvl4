const apiPath = '/api/v1';

export const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
};

export const pages = {
  login: '/login',
  chat: '/',
  signup: '/signup',
};
