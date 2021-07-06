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
  setFirestoreDocumentData,
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
  getSuccessChatsSubscription,
  TEST_IDS,
  personOne,
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
  getFireStoreDocumentReference
    .mockImplementationOnce(() => chatWindowStub.joined[0])
    .mockImplementationOnce(() => chatWindowStub.joined[1])
    .mockImplementationOnce(() => chatWindowStub.joined[1])
    .mockImplementationOnce(() => ({
      onSnapshot: jest.fn(async snapshotCallbackFunction => {
        snapshotCallbackFunction(getSuccessChatsSubscription());
      }),
    }));
};

const mockGetFireStoreDocumentData = async (responseType, chatWindowType) => {
  if (responseType === 'success') {
    getFireStoreDocumentData.mockImplementationOnce(() =>
      getSuccessChatWindowData(chatWindowType),
    );
  } else {
    getFireStoreDocumentData.mockImplementation(() => getFailureResponse());
  }
};

const mockSetFirestoreDocumentData = async responseType => {
  if (responseType === 'success') {
    setFirestoreDocumentData.mockImplementationOnce(() => Promise.resolve());
  } else {
    setFirestoreDocumentData.mockImplementation(() => getFailureResponse());
  }
};
let store;
const props = {
  storeData: {
    currentUserRef: personOne,
    receiverUserRefs: [],
    receiverUserValues: [],
    currentUserValue: {},
    searchResults: [],
    loading: false,
    selectedChatWindow: '',
  },
  updateAction: jest.fn(),
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
  it('Should render and match the snapshot', () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('error');
    mockGetDataFromReference('error', 'different');
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should select the value from dropdown', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByRole, getByText } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
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
  it('Should select the value from dropdown and chat window fails to open', async () => {
    mockSetFirestoreDocumentData('failure');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByRole, getByText } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
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
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    expect(getByText('johndoe_1')).toBeInTheDocument();
  });
  it('Should fetch the chat list and not contain the loggedIn email address', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByText, queryByText } = componentWrapper();
    await waitForElement(() => getByText(''));
    expect(queryByText('johndoe_1')).not.toBeInTheDocument();
  });
  it('Should fetch the chat list with failure cases', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('failure');
    mockGetFireStoreDocumentData('success', 'new');
    const { queryByText, getByText } = componentWrapper();
    await waitForElement(() => getByText(''));
    expect(queryByText('johndoe_1')).not.toBeInTheDocument();
  });
  it('Should click on chat button', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
  });
  it('Should click on chat button and close the window', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId, queryByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    expect(queryByTestId(TEST_IDS.SEND_MESSAGE)).not.toBeInTheDocument();
  });
  it('Should click on chat button and write message to send it', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and write message to send it and it gets failed', async () => {
    mockSetFirestoreDocumentData('failure');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and try to click on send button without any value', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
  });
});
