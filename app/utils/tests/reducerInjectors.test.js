/**
 * Test injectors
 */

import produce from 'immer';
import { memoryHistory } from 'react-router-dom';
import identity from 'lodash/identity';

import configureStore from '../../configureStore';

import getInjectors, { injectReducerFactory } from '../reducerInjectors';

// Fixtures

const initialState = { reduced: 'soon' };

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'TEST':
        draft.reduced = action.payload;
        break;
    }
  });

describe('reducer injectors', () => {
  let prevStore;
  let injectReducer;

  describe('getInjectors', () => {
    beforeEach(() => {
      // store = configureStore({}, memoryHistory);
      const { store } = configureStore(initialState, memoryHistory);
      prevStore = store;
    });

    it('should return injectors', () => {
      expect(getInjectors(prevStore)).toEqual(
        expect.objectContaining({
          injectReducer: expect.any(Function),
        }),
      );
    });

    it('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(prevStore, 'dispatch');

      expect(() => getInjectors(prevStore)).toThrow();
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      // store = configureStore({}, memoryHistory);
      const { store } = configureStore(initialState, memoryHistory);
      prevStore = store;
      injectReducer = injectReducerFactory(prevStore, true);
    });

    it('should check a store if the second argument is falsy', () => {
      const inject = injectReducerFactory({});

      expect(() => inject('test', reducer)).toThrow();
    });

    it('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(prevStore, 'dispatch');

      expect(() => injectReducer('test', reducer)).not.toThrow();
    });

    it("should validate a reducer and reducer's key", () => {
      expect(() => injectReducer('', reducer)).toThrow();
      expect(() => injectReducer(1, reducer)).toThrow();
      expect(() => injectReducer(1, 1)).toThrow();
    });

    it('given a store, it should provide a function to inject a reducer', () => {
      injectReducer('test', reducer);

      const actual = prevStore.getState().test;
      const expected = initialState;

      expect(actual).toEqual(expected);
    });

    it('should not assign reducer if already existing', () => {
      prevStore.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(prevStore.replaceReducer).toHaveBeenCalledTimes(1);
    });

    it('should assign reducer if different implementation for hot reloading', () => {
      prevStore.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', identity);

      expect(prevStore.replaceReducer).toHaveBeenCalledTimes(2);
    });
  });
});
