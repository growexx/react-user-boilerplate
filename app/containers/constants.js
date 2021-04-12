// Control Bit
export const IS_DEMO_CODE = true;

// App-Routes
export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  FONT_AWESOME: '/font-awesome',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  LOGOUT: '/logout',
  LOADER: '/loader',
  EXPORT_DATA: '/export-data',
  TEST_ADMIN_PAGE: '/admin',
  UNAUTHORIZED: '/403',
  NUMERAL_CONVERTER: '/number-converter-demo',
  SAMPLE_FORM: '/sample-form',
  CHANGE_PASSWORD: '/change-password',
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
  IMAGE_UPLOAD: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
};

// Table Pagination default
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

/**
 * Roles for system
 * ACL from frontend
 * This configuration is being used in RoleMiddleware
 */
// Note: Define role in this constant
export const ROLES = {
  USER: 1,
  ADMIN: 10,
};

// Note: Add Routes which needs to check role before it's access
export const RESTRICTED_ROUTES = [ROUTES.PROFILE, ROUTES.TEST_ADMIN_PAGE];

// Note: Define role against all accessible routes
export const ROLE_BASED_ROUTE_ACCESS = {
  [ROLES.USER]: [ROUTES.PROFILE],
  [ROLES.ADMIN]: [ROUTES.TEST_ADMIN_PAGE],
};

// Note: Role based default routes for redirection
export const ROLE_BASED_DEFAULT_ROUTE = {
  [ROLES.USER]: ROUTES.HOME,
};

/**
 * Controls which sidebar entries shown to this user
 */
// Sidebar role based update
export const ROLE_BASED_SIDEBAR_MENU = {
  [ROLES.USER]: [],
  [ROLES.ADMIN]: [ROUTES.TEST_ADMIN_PAGE],
};
