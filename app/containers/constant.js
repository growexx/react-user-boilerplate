// App-Routes
export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  FONTAWESOME: '/font-awesome',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  LOGOUT: '/logout',
  LOADER: '/loader',
  EXPORTDATA: '/export-data',
  NUMERALCONVERTER: '/number-converter-demo',
};

// API-ROUTES
export const API_URL = 'https://b0257f3aa104.ngrok.io';
export const AUTH = 'auth';
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/${AUTH}/signin`,
  LIST: 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo',
  LIST_AVATAR:
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  EXPORT_CSV: '',
};

// Table Pagination default
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

/**
 * Roles for system
 * ACL from frontend
 * This configuration is being used in RoleMiddleware
 */
export const ROLES = {
  USER: 1,
};

export const RESTRICTED_ROUTES = [ROUTES.PROFILE];

export const ROLE_BASED_ROUTE_ACCESS = {
  [ROLES.USER]: [ROUTES.PROFILE],
};

export const ROLE_BASED_DEFAULT_ROUTE = {
  [ROLES.USER]: ROUTES.HOME,
};

/**
 * Controls which sidebar entries shown to this user
 */
export const ROLE_BASED_SIDEBAR_MENU = {
  [ROLES.USER]: [],
};
