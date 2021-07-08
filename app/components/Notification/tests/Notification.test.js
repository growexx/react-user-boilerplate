import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { getFireStoreCollectionReference } from 'utils/firebase';
import { ROUTES } from 'containers/constants';
import {
  getSuccessMockChatList,
  getFailureMockChatList,
} from 'examples/RealTimeChat/stub';
import Notification from 'components/Notification/index';
import configureStore from 'configureStore';
jest.mock('utils/firebase');
const mockGetFireStoreCollectionReference = async () => {
  getFireStoreCollectionReference.mockImplementation(() => ({
    where: jest.fn().mockImplementation(() => ({
      onSnapshot: jest.fn(
        (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
          snapshotCallbackFunction(getSuccessMockChatList());
          snapshotCallbackErrorFunction(getFailureMockChatList());
          return jest.fn();
        },
      ),
    })),
  }));
};
describe('<Notification />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    mockGetFireStoreCollectionReference();
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
    mockGetFireStoreCollectionReference();
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
});
