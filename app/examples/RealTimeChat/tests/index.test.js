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
import {
  getFireStoreCollectionReference,
  getDataFromReference,
  getFireStoreDocumentReference,
  getFireStoreDocumentData,
} from 'utils/firebase';
import {
  chatWindowStub,
  getSuccessMockSearchResults,
  getSuccessMockChatList,
  getSuccessDataFromReferenceSameEmail,
  getSuccessDataFromReferenceDiffEmail,
  getFailureMockChatList,
  getFailureResponse,
  getSuccessChatWindowData,
  TEST_IDS,
} from 'examples/RealTimeChat/stub';
jest.mock('utils/firebase');
jest.mock('utils/Helper', () => ({
  getUserData: jest.fn().mockReturnValue({
    email: 'johndoe_0@gmail.com',
  }),
}));
const mockGetFireStoreCollectionReference = async responseType => {
  getFireStoreCollectionReference.mockImplementation(() => ({
    where: jest.fn().mockImplementation(() => ({
      onSnapshot: jest.fn(
        async (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
          snapshotCallbackFunction(getSuccessMockChatList());
          snapshotCallbackErrorFunction(getFailureMockChatList());
        },
      ),
      get: jest
        .fn()
        .mockImplementationOnce(() =>
          responseType === 'success'
            ? getSuccessMockSearchResults()
            : getFailureResponse(),
        ),
    })),
  }));
};

const mockGetDataFromReference = async (responseType, emailType) => {
  if (responseType === 'success') {
    if (emailType === 'same') {
      getDataFromReference.mockImplementation(() =>
        getSuccessDataFromReferenceSameEmail(),
      );
    } else {
      getDataFromReference.mockImplementation(() =>
        getSuccessDataFromReferenceDiffEmail(),
      );
    }
  } else {
    getDataFromReference.mockImplementation(() => getFailureResponse());
  }
};

export const mockGetFireStoreDocumentReference = async () => {
  getFireStoreDocumentReference.mockImplementation(
    () => chatWindowStub.joined[0],
  );
};

const mockGetFireStoreDocumentData = async responseType => {
  if (responseType === 'success') {
    getFireStoreDocumentData.mockImplementationOnce(() =>
      getSuccessChatWindowData('old'),
    );
  } else {
    getFireStoreDocumentData.mockImplementation(() => getFailureResponse());
  }
};
let store;
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <RealTimeChat />
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
  it('Should render and match the snapshot', () => {
    mockGetFireStoreCollectionReference('error');
    mockGetDataFromReference('success', 'different');
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should select the value from dropdown', async () => {
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentReference();
    const { getByRole, getByText } = componentWrapper();
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: 'johndoe_9@gmail.com',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johndoe_9@gmail.com')).toBeInTheDocument();
  });
  it('Should fetch the chat list and set the state values', async () => {
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    expect(getByText('johndoe_1')).toBeInTheDocument();
  });
  it('Should fetch the chat list and not contain the loggedIn email address', async () => {
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    const { getByText, queryByText } = componentWrapper();
    await waitForElement(() => getByText(''));
    expect(queryByText('johndoe_1')).not.toBeInTheDocument();
  });
  it('Should fetch the chat list with failure cases', async () => {
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('failure');
    const { queryByText, getByText } = componentWrapper();
    await waitForElement(() => getByText(''));
    expect(queryByText('johndoe_1')).not.toBeInTheDocument();
  });
  it('Should click on chat button', async () => {
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreDocumentData('success');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
  });
});
