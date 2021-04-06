import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePassword state domain
 */

const selectChangePasswordDomain = state =>
  state.ChangePassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangePassword
 */

const makeSelectCurrentPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.currentPassword,
  );

const makeSelectNewPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.newPassword,
  );

const makeSelectConfirmNewPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.confirmNewPassword,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.loading,
  );
const makeSelectSuccess = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.success,
  );

const makeSelectError = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate.error,
  );

export {
  selectChangePasswordDomain,
  makeSelectCurrentPassword,
  makeSelectConfirmNewPassword,
  makeSelectNewPassword,
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
};
