import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registration state domain
 */

const selectRegistrationDomain = state => state.registration || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Registration
 */

const makeSelectRegistration = () =>
  createSelector(
    selectRegistrationDomain,
    substate => substate,
  );

export default makeSelectRegistration;
export { selectRegistrationDomain };
