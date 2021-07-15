/**
 * Test store addons
 */

import { browserHistory } from 'react-router-dom';
import configureStore from '../configureStore';

describe('configureStore', () => {
  let prevStore;

  beforeAll(() => {
    const { store } = configureStore({}, browserHistory);
    // store = configureStore({}, browserHistory);
    prevStore = store;
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof prevStore.injectedReducers).toBe('object');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof prevStore.injectedSagas).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof prevStore.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined, browserHistory);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});
