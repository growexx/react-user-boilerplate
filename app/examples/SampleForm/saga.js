// import { take, call, put, select } from 'redux-saga/effects';

import { select, takeLatest } from '@redux-saga/core/effects';
import makeSelectSampleForm from './selectors';
import { SUBMIT_DATA } from './constants';

export function* submitData() {
  const sampleData = yield select(makeSelectSampleForm());
  alert(`Inside Saga Data\n ${JSON.stringify(sampleData, null, 2)}`);
  // Note: Add API Call
}

// Individual exports for testing
export default function* sampleFormSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_DATA, submitData);
}
