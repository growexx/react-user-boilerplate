import React from 'react';
import { render, wait } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import request from 'utils/request';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../../configureStore';
import ListWithInfiniteLoader from '../ListWithInfiniteLoader';
// let store;
let prevStore;
let prevPersistor;
jest.mock('utils/request');
const componentWrapper = () =>
  render(
    <Provider store={prevStore}>
      <PersistGate persistor={prevPersistor}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ListWithInfiniteLoader />
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>,
  );
describe('<ListWithInfiniteLoader />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
  });

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should render and match the snapshot', async () => {
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        results: [
          {
            name: {
              last: 'testInfiniteLoader',
              email: 'test@234.com',
            },
          },
        ],
      }),
    );
    const {
      container: { firstChild },
    } = componentWrapper();
    await wait(() => expect(request).toHaveBeenCalledTimes(2));
    expect(firstChild).toMatchSnapshot();
  });
});
