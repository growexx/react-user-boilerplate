import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { getFireStoreCollectionReference } from 'utils/firebase';
import { ROUTES } from 'containers/constants';
import {
  getFailureMockChatList,
  getFailureResponse,
} from 'examples/RealTimeChat/stub';
import {
  getSuccessMockUserId,
  getSuccessWindows,
} from 'components/Notification/stub';
import Notification from 'components/Notification/index';
import configureStore from 'configureStore';
import products from '../../../examples/Products/stub/product.json';
jest.mock('utils/firebase');
const mockGetFireStoreCollectionReference = async (
  responseType,
  dataLength,
) => {
  getFireStoreCollectionReference.mockImplementation(() => ({
    where: jest.fn().mockImplementation(() => ({
      onSnapshot: jest.fn(
        (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
          snapshotCallbackFunction(getSuccessWindows(dataLength));
          snapshotCallbackErrorFunction(getFailureMockChatList());
          return dataLength === 0 ? jest.fn() : '';
        },
      ),
      get: jest
        .fn()
        .mockImplementationOnce(() =>
          responseType === 'success'
            ? getSuccessMockUserId(dataLength)
            : getFailureResponse(),
        ),
    })),
  }));
};

const dummyData = products.products.slice(0, 2);

describe('<Notification />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  beforeEach(() => getFireStoreCollectionReference.mockReset());
  afterEach(() => getFireStoreCollectionReference.mockClear());
  it('should render a div with real time chat path', () => {
    mockGetFireStoreCollectionReference('success', 1);
    history.push(ROUTES.REAL_TIME_CHAT);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render a div with real time chat path', () => {
    mockGetFireStoreCollectionReference('success');
    history.push(ROUTES.REAL_TIME_CHAT);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render a div with real time chat path', () => {
    mockGetFireStoreCollectionReference('success');
    history.push(ROUTES.HOME);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render a div', () => {
    mockGetFireStoreCollectionReference('error');
    history.push(ROUTES.HOME);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render a div with real time chat path with no user id', () => {
    mockGetFireStoreCollectionReference('success', 0);
    history.push(ROUTES.REAL_TIME_CHAT);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('display should update notifications', () => {
    window.product = dummyData;
    window.localStorage = {};
    window.localStorage.setItem = (key, value) => {
      window.localStorage[key] = value;
    };
    window.localStorage.getItem = key => window.localStorage[key];
    const { getByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router history={history}>
            <Notification />
          </Router>
        </IntlProvider>
      </Provider>,
    );
    window.localStorage.setItem('products', JSON.stringify(dummyData));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value',
      }),
    );
    fireEvent.click(getByTestId('badge-notification'));

    expect(getByTestId('badge-cart-drawer')).toBeTruthy();
  });
});
