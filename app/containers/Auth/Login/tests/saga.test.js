/* eslint-disable space-before-function-paren */
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOGIN } from '../constants';
import setSaga, { getSignIn as setSagaFunction } from '../saga';
jest.mock('utils/request');
jest.mock('containers/constants', () => ({
  IS_DEMO_CODE: false,
  ROUTES: {
    HOME: '/',
  },
}));
const initialState = {
  login: {
    email: 'test',
    password: 'test',
    loading: false,
    error: false,
    success: 'done',
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);
export async function recordSaga(saga) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState() {
        return store.getState();
      },
    },
    saga,
  ).done;

  return dispatched;
}
describe('Testing getSignIn', () => {
  test('Demo Mode Off and status 1', async () => {
    request.mockImplementation(() =>
      Promise.resolve({ status: 1, data: { token: 'test' } }),
    );
    await recordSaga(setSagaFunction);
    expect(request).toHaveBeenCalled();
  });
  test('Demo Mode Off and status 0', async () => {
    request.mockImplementation(() => Promise.resolve({ status: 0 }));
    await recordSaga(setSagaFunction);
    expect(request).toHaveBeenCalled();
  });
  test('Demo Mode Off and Network Error', async () => {
    request.mockImplementation(() => Promise.error({ status: 0 }));
    await recordSaga(setSagaFunction);
    expect(request).toHaveBeenCalled();
  });
});
describe('Testing login', () => {
  test('login', () => {
    const gen = setSaga();
    expect(gen.next().value).toEqual(takeLatest(LOGIN, setSagaFunction));
  });
});
