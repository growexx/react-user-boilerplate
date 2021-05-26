/*
 * Users constants
 */
export const USERS_KEY = 'users';
export const UPDATE_FIELD = 'app/Users/UPDATE_FIELD';

export const MESSAGES = {
  ACTIVE_TOGGLE: {
    SUSPEND: `Are you sure you want to suspend this user?`,
    ACTIVE: 'Are you sure you want to activate?',
  },
  DELETE: 'Are you sure you want to remove this user?',
  TITLE: {
    ACTIVATE: 'Activating means users will be able to access the app.',
    SUSPEND: `Deactivating means users will not be able to access the app.`,
    DELETE: `Removing user will initiate deletion process and user will not be able to login.`,
  },
};

export const ACCOUNT_STATUS = {
  ACTIVE: 'Active',
  SUSPENDED: 'Suspended',
};

export const POPUP_ACTION = {
  ACTIVATE: 'activate',
  DELETE: 'delete',
};

export const TEST_IDS = {
  ADD_USER: 'ADD_USER',
  USER_MODAL_OK: 'USER_MODAL_OK',
  USER_MODAL_CANCEL: 'USER_MODAL_CANCEL',

  DELETE_BUTTON: 'DELETE_BUTTON',
};
