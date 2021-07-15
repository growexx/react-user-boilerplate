/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';

import { PersistGate } from 'redux-persist/integration/react';
// import history from 'utils/history';
import configureStore from '../../configureStore';
import injectReducer, { useInjectReducer } from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';

// Fixtures
const Component = () => null;

const reducer = s => s;

describe('injectReducer decorator', () => {
  // let store;
  let prevStore;
  let prevPersistor;

  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    const { store, persistor } = configureStore({}, memoryHistory);
    prevStore = store;
    prevPersistor = persistor;
    // prevStore = configureStore({}, memoryHistory);
    injectors = {
      injectReducer: jest.fn(),
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component);
    reducerInjectors.default.mockClear();
  });

  it('should inject a given reducer', () => {
    render(
      <Provider store={prevStore}>
        <PersistGate persistor={prevPersistor}>
          <ComponentWithReducer />
        </PersistGate>
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(
      injectReducer({ key: 'test', reducer })(() => null).displayName,
    ).toBe('withReducer(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = render(
      <Provider store={prevStore}>
        <PersistGate persistor={prevPersistor}>
          <ComponentWithReducer {...props} />
        </PersistGate>
      </Provider>,
    );
    expect(renderedComponent.root.props.children.props.children.props).toEqual(
      props,
    );
  });
});

describe('useInjectReducer hook', () => {
  // let store;
  let prevStore;
  let prevPersistor;

  // const { store, persistor } = configureStore({}, history);
  // prevStore = store;
  // prevPersistor = persistor;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
    // prevStore = configureStore({}, memoryHistory);
    const { store, persistor } = configureStore({}, memoryHistory);
    prevStore = store;
    prevPersistor = persistor;
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      <Provider store={prevStore}>
        <PersistGate persistor={prevPersistor}>
          <ComponentWithReducer />
        </PersistGate>
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(0);
  });
});
