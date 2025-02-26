export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    VERIFY_EMAIL: '/api/v1/auth/verify',
    LOGOUT: '/api/v1/auth/logout'
  },
  HABITS: {
    BASE: '/habits',
    GET_ALL: '/habits',
    CREATE: '/habits',
    UPDATE: (id: string) => `/habits/${id}`,
    DELETE: (id: string) => `/habits/${id}`,
    TOGGLE: (id: string) => `/habits/${id}/toggle`
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile'
  }
};
