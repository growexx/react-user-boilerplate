import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the twoFactorAuthentication state domain
 */

const selectTwoFactorAuthenticationDomain = state =>
  state.twoFactorAuthentication || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TwoFactorAuthentication
 */

const makeSelectTwoFactorAuthentication = () =>
  createSelector(
    selectTwoFactorAuthenticationDomain,
    substate => substate,
  );

export default makeSelectTwoFactorAuthentication;
export { selectTwoFactorAuthenticationDomain };
