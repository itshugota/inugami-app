const APP_ROUTES = {
  AUTH: {
    URL: '/auth',
    CHILDREN: {
      LOGIN: { URL: '/login' },
      REGISTER: { URL: '/register' }
    }
  }
};

export { APP_ROUTES };
