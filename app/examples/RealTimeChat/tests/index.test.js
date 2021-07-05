/**
 *
 * Tests for RealTimeChat
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from 'configureStore';
import RealTimeChat from 'examples/RealTimeChat/index';
import { getFireStoreCollectionReference } from 'utils/firebase';
import {
  chatWindowStub,
  getSuccessMockSearchResults,
  getFailureMockSearchResults,
} from 'examples/RealTimeChat/stub';
jest.mock('utils/firebase');
jest.mock('utils/Helper', () => ({
  getUserData: jest.fn().mockReturnValue({
    email: 'johnDoe@growexx.com',
  }),
}));
const mockFirebaseHelperFunctions = responseType => {
  getFireStoreCollectionReference.mockImplementation(() => ({
    where: jest.fn().mockImplementation(() => ({
      onSnapshot: jest.fn(),
      get: jest
        .fn()
        .mockImplementationOnce(() =>
          responseType === 'success'
            ? getSuccessMockSearchResults()
            : getFailureMockSearchResults(),
        ),
    })),
  }));
};
let store;
const props = {
  selectedChatWindow: chatWindowStub.joined,
};
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <RealTimeChat {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<RealTimeChat />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  afterEach(() => {
    getFireStoreCollectionReference.mockReset();
  });
  it('Should select the value from dropdown', async () => {
    mockFirebaseHelperFunctions('success');
    const { getByRole, debug, getByText } = componentWrapper();
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: 'johndoe_9@gmail.com',
      },
    });
    debug();
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johndoe_9@gmail.com')).toBeInTheDocument();
  });
  it('Should render and match the snapshot', () => {
    mockFirebaseHelperFunctions('error');
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
