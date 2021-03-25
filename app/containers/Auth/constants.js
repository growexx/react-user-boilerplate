export const AUTH_TYPE = ['LOGIN', 'REGISTER'];

// App-Routes
export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  FONTAWESOME: '/font-awesome',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  LOGOUT: '/logout',
};

// API-ROUTES
export const API_URL = 'https://b0257f3aa104.ngrok.io';
export const AUTH = 'auth';
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/${AUTH}/signin`,
};
