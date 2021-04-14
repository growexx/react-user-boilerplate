/*
 *
 * ChangePassword constants
 *
 */
const PASSWORD_MUST_MATCH = 'Passwords do not match';
export const passwordsMustMatch = (value, allValues) =>
  value !== allValues.newPassword ? PASSWORD_MUST_MATCH : undefined;
