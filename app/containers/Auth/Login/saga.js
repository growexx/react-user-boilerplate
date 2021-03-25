/**
 * Logs the user in the app
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/Auth/Login/selectors';

import { LOGIN } from './constants';
import { API_ENDPOINTS, ROUTES } from '../constants';
import { changeLoading, logInError, logInSuccess } from './actions';
import StorageService from '../../../utils/StorageService';
import { STORAGE_KEY } from '../../../utils/constants';

/**
 * user login request/response handler
 */
export function* getSignIn() {
  const emailId = yield select(makeSelectEmail());
  const passWord = yield select(makeSelectPassword());
  const payload = {
    email: emailId,
    password: passWord,
  };
  const data = {
    method: 'POST',
    body: payload,
  };

  try {
    const log = yield call(request, API_ENDPOINTS.LOGIN, data);
    yield put(changeLoading(true));
    if (log.status === 1) {
      yield put(logInSuccess(log.message));
      StorageService.set(STORAGE_KEY, log.data.token);
      yield put(changeLoading(false));
    }
  } catch (err) {
    yield put(logInError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  // Watches for LOGIN actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, getSignIn);
}
