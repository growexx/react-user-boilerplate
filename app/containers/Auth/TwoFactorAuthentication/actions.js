/*
 *
 * TwoFactorAuthentication actions
 *
 */

import { VALUE } from './constants';

export function changeValue(value) {
  return {
    type: VALUE,
    value,
  };
}
