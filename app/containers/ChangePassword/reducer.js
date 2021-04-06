/*
 *
 * ChangePassword reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CURRENT_PASSWORD,
  CHANGE_CONFIRM_NEW_PASSWORD,
  SUCCESS,
  LOADING,
  ERROR,
} from './constants';

export const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  error: '',
  loading: false,
  success: '',
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_CURRENT_PASSWORD:
        draft.currentPassword = action.value;
        break;
      case CHANGE_NEW_PASSWORD:
        draft.newPassword = action.value;
        break;
      case CHANGE_CONFIRM_NEW_PASSWORD:
        draft.confirmNewPassword = action.value;
        break;
      case ERROR:
      case SUCCESS:
      case LOADING:
        draft.error = action.value;
        break;
    }
  });

export default changePasswordReducer;
