const apiPath = '/api/v1';

export const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
};

export const pages = {
  login: '/login',
  chat: '/',
  signup: '/signup',
};
