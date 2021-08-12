// Control Bit
export const IS_DEMO_CODE = true;

// App-Routes
export const ROUTES = {
  HOME: '/',
  GITHUB_SEARCH: '/github-search',
  FONT_AWESOME: '/font-awesome',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  LOGOUT: '/logout',
  LOADER: '/loader',
  EXPORT_DATA: '/export-data',
  USERS: '/users',
  CHARTS: '/charts',
  TEST_ADMIN_PAGE: '/admin',
  UNAUTHORIZED: '/403',
  NUMERAL_CONVERTER: '/number-converter-demo',
  SAMPLE_FORM: '/sample-form',
  CHANGE_PASSWORD: '/change-password',
  TWO_FACTOR_AUTHENTICATION: '/two-factor-authentication',
  FORGOT_PASSWORD: '/forgot-password',
  MULTI_TAB_SUPPORT: '/multi-tab-support',
  PRODUCTS: '/products',
};

// API-ROUTES
export const { API_URL } = process.env;
export const AUTH = 'auth';
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/${AUTH}/signin`,
  LIST: 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo',
  LIST_AVATAR:
    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  EXPORT_CSV: '',
  IMAGE_UPLOAD: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  FORGOT_PASSWORD: `${API_URL}/${AUTH}/forgetpassword`,
  USERS: `${API_URL}/users`,
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

export const DEFAULT_PAGE_NO = 1;
export const DEFAULT_SIZE = 10;
export const SORTING = {
  ASC: 1,
  DESC: -1,
  ascend: 1,
  descend: -1,
};
/**
 *
 * @param {string} order  ['ascend','descend']
 * @returns
 */
export const GET_SORT_ORDER = order => {
  switch (order) {
    case 'ascend':
      return SORTING.ASC;
    case 'descend':
      return SORTING.DESC;
    default:
      return SORTING.DESC;
  }
};

export const GET_DEFAULT_PAGINATION = () => ({
  pageSize: DEFAULT_SIZE,
  current: DEFAULT_PAGE_NO,
  total: 0,
});

export const GENERIC_MOMENT_DATE_FORMAT = 'YYYY-MM-DD';
export const FULL_GENERIC_MOMENT_DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss a';
export const CHANNEL_NAME = 'DATA_CHANNEL_NAME';
