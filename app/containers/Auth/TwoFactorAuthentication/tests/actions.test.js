import { changeValue } from '../actions';
import { TEST_OTP_VALUE, CHANGE_VALUE } from '../constants';

describe('TwoFactorAuthentication actions', () => {
  describe('changeValue Action', () => {
    it('has a type of VALUE', () => {
      const expected = {
        type: CHANGE_VALUE,
        value: TEST_OTP_VALUE,
      };
      expect(changeValue(TEST_OTP_VALUE)).toEqual(expected);
    });
  });
});
