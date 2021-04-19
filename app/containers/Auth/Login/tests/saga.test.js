import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import configureStore from 'redux-mock-store';
import { LOGIN } from '../constants';
import setSaga, {
  getSignIn as setSagaFunction,
  getFacebookSignIn,
  getGoogleSignIn,
  getMicrosoftSignIn,
} from '../saga';
jest.mock('utils/request');
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
  test('Demo Mode On', async () => {
    await recordSaga(setSagaFunction);
    await recordSaga(getFacebookSignIn);
    await recordSaga(getGoogleSignIn);
    await recordSaga(getMicrosoftSignIn);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
});
describe('Testing login', () => {
  test('login', () => {
    const gen = setSaga();
    expect(gen.next().value).toEqual(takeLatest(LOGIN, setSagaFunction));
  });
});
