import * as types from '../constants';
import reducer, { initialState } from '../reducer';
const value = 'test value';
const getFormJsStateInstance = config =>
  Object.assign(
    {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      error: '',
      loading: false,
      success: '',
    },
    config,
  );
describe('ChangePassword reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_CURRENT_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CURRENT_PASSWORD,
        value,
      }),
    ).toEqual(getFormJsStateInstance({ currentPassword: value }));
  });
  it('should handle CHANGE_NEW_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_NEW_PASSWORD,
        value,
      }),
    ).toEqual(getFormJsStateInstance({ newPassword: value }));
  });
  it('should handle CHANGE_CONFIRM_NEW_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CONFIRM_NEW_PASSWORD,
        value,
      }),
    ).toEqual(getFormJsStateInstance({ confirmNewPassword: value }));
  });
  it('should handle LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.LOADING,
        value,
      }),
    ).toEqual(getFormJsStateInstance({ loading: value }));
  });
  it('should handle ERROR', () => {
    expect(
      reducer(initialState, {
        type: types.ERROR,
        value,
      }),
    ).toEqual(getFormJsStateInstance({ error: value }));
  });
  it('should handle SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.SUCCESS,
        value,
      }),
    ).toEqual(getFormJsStateInstance({ success: value }));
  });
});
