/**
 * fires two factor authentication
 */

import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Emitter from 'utils/events';
import { db } from 'utils/firebase';
import { loginSuccessResponse } from 'containers/Auth/Login/stub/login.stub';
import { SUBMIT } from './constants';
import { FIRESTORE_COLLECTIONS, ROUTES } from '../../constants';
import StorageService from '../../../utils/StorageService';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { changeValue } from './actions';

/**
 * user login request/response handler
 */
export function* getSignIn() {
  /**
   * Remove following code, It's only for demo purpose
   */
  StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
  StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
  yield put(push(ROUTES.HOME));
  Emitter.emit(EMITTER_EVENTS.LOG_IN);
  yield put(changeValue(''));
  // ----------------Demo--------------------

  // check value in database, if no data found then to add to firestore
  const collectionRef = db.collection(FIRESTORE_COLLECTIONS.PROFILE);
  const docRef = collectionRef.doc(loginSuccessResponse.data.email);

  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
      } else {
        collectionRef.doc(loginSuccessResponse.data.email).set({
          email: loginSuccessResponse.data.email,
          lastSeen: new Date(),
        });
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* twoFactorAuthentication() {
  // Watches for SUBMIT actions and calls getSignIn when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SUBMIT, getSignIn);
}
