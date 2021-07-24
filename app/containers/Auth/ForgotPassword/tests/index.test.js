/**
 *
 * Tests for ForgotPassword
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import request from 'utils/request';
import { PersistGate } from 'redux-persist/integration/react';
import ForgotPassword from '../Loadable';
import configureStore from '../../../../configureStore';
import { TEST_IDS } from '../stub/test.stub';
jest.mock('utils/request');
// let store;
let prevStore;
let prevPersistor;

const componentWrapper = () =>
  render(
    <Provider store={prevStore}>
      <PersistGate persistor={prevPersistor}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ForgotPassword />
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>,
  );

describe('<ForgotPassword />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve({}));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});

describe('Forgot Password Request', () => {
  // beforeAll(() => {
  //   store = configureStore({}, browserHistory);
  // });

  afterEach(() => {
    request.mockClear();
  });

  it('Successfully submitted reset request', async () => {
    request.mockImplementationOnce(() =>
      Promise.resolve({ status: 1, message: 'Successfully sent reset email!' }),
    );
    const { getByTestId, getByPlaceholderText } = componentWrapper();
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'john.doe@growexx.com' },
    });
    fireEvent.click(getByTestId(TEST_IDS.RESET_PASSWORD));
  });

  it('Successfully submitted reset request fails', async () => {
    request.mockImplementationOnce(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        response: {
          json: () => Promise().resolve('Something went wrong'),
        },
      }),
    );
    const { getByTestId, getByPlaceholderText } = componentWrapper();
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'john.doe@growexx.com' },
    });
    fireEvent.click(getByTestId(TEST_IDS.RESET_PASSWORD));
  });
});
