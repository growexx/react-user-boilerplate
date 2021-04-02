/**
 * Logs the user in the app
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import sha256 from 'sha256';
import { push } from 'connected-react-router';
import request from 'utils/request';
import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/Auth/Login/selectors';
import Emitter from 'utils/events';
import { LOGIN } from './constants';
import { API_ENDPOINTS } from '../constants';
import { IS_DEMO_CODE, ROUTES } from '../../constant';
import { changeLoading, logInError, logInSuccess, resetState } from './actions';
import StorageService from '../../../utils/StorageService';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { loginSuccessResponse } from './stub/login.stub';

/**
 * user login request/response handler
 */
export function* getSignIn() {
  const emailId = yield select(makeSelectEmail());
  const passWord = yield select(makeSelectPassword());
  const payload = {
    email: emailId,
    password: sha256(passWord),
  };
  const data = {
    method: 'POST',
    body: payload,
  };
  /**
   * Remove following code, It's only for demo purpose
   */
  if (IS_DEMO_CODE) {
    yield put(logInSuccess(loginSuccessResponse.message));
    StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
    StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
    yield put(changeLoading(false));
    yield put(resetState());
    yield put(push(ROUTES.HOME));
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
    // ----------------Demo--------------------
  } else {
    try {
      const log = yield call(request, API_ENDPOINTS.LOGIN, data);
      yield put(changeLoading(true));
      if (log.status === 1) {
        yield put(logInSuccess(log.message));
        StorageService.set(TOKEN_KEY, log.data.token);
        StorageService.set(USER_DATA_KEY, log.data);
        yield put(changeLoading(false));
        yield put(resetState());
        yield put(push(ROUTES.HOME));
        Emitter.emit(EMITTER_EVENTS.LOG_IN);
      } else {
        yield put(resetState());
        yield put(changeLoading(false));
        yield put(logInError(true));
      }
    } catch (err) {
      yield put(resetState());
      yield put(changeLoading(false));
      yield put(logInError(true));
    }
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
