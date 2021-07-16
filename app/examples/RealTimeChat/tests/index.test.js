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
  getCurrentUserMock,
  TEST_IDS,
  personOne,
} from 'examples/RealTimeChat/stub';
jest.mock('utils/firebase');
jest.mock('utils/Helper', () => ({
  getUserData: jest.fn().mockReturnValue({
    email: 'johndoe_0@gmail.com',
  }),
}));
const mockGetFireStoreCollectionReference = async (
  responseType,
  elseCase,
  chatParticipants,
) => {
  getFireStoreCollectionReference
    .mockImplementationOnce(() => ({
      // real time chat component - for saving currentUserRef
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getCurrentUserMock(elseCase)
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      // Search User component - for saving search results
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessMockSearchResults()
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      // Chat List component - for getting the already done chats
      where: jest.fn().mockImplementationOnce(() => ({
        onSnapshot: jest.fn(
          (snapshotCallbackFunction, snapshotCallbackErrorFunction) => {
            snapshotCallbackFunction(getSuccessMockChatList());
            snapshotCallbackErrorFunction(getFailureMockChatList());
            return jest.fn();
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
    }))
    .mockImplementationOnce(() => ({
      // search user component - for selecting the user
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessChatWindowData()
              : getFailureResponse(),
          ),
      })),
    }))
    .mockImplementationOnce(() => ({
      // chat room component - for successfully getting the chat window
      where: jest.fn().mockImplementationOnce(() => ({
        get: jest
          .fn()
          .mockImplementation(() =>
            responseType === 'success'
              ? getSuccessChatWindowData(elseCase, chatParticipants)
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
    .mockImplementation(() => ({
      onSnapshot: jest.fn(async snapshotCallbackFunction => {
        snapshotCallbackFunction(getSuccessChatsSubscription());
        jest.fn();
      }),
    }));
};

const mockGetFireStoreDocumentData = async (
  responseType,
  chatWindowType,
  chatParticipants,
) => {
  if (responseType === 'success') {
    getFireStoreDocumentData.mockImplementationOnce(() =>
      getSuccessChatWindowData(chatWindowType, chatParticipants),
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
    setFirestoreDocumentData.mockReset();
    getFireStoreDocumentData.mockReset();
    getFireStoreDocumentReference.mockReset();
  });
  it.only('Getting the users for dropdown fails', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('failure');
    mockGetDataFromReference('success', 'same');
    const { getByTestId, getByRole } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    expect(getByTestId(TEST_IDS.CREATE_CHAT)).toBeInTheDocument();
  });
  it.only('Should select the value from dropdown', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    const { getByRole, getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    expect(getByTestId(TEST_IDS.CLOSE_ICON)).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it.only('Should select the value from dropdown and chatWindow is already open', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    const { getByRole, getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByRole('combobox'));
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    expect(getByTestId(TEST_IDS.CLOSE_ICON)).toBeTruthy();
    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.change(getByRole('combobox'), {
      target: {
        value: '0',
      },
    });
    await waitForElement(() => getByRole('option'));
    fireEvent.click(
      document.querySelectorAll('.ant-select-item-option-content')[0],
    );
    expect(getByText('johnDoe')).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CREATE_CHAT));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should select the value from dropdown and chat window fails to open', async () => {
    mockSetFirestoreDocumentData('failure');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByRole, getByText, getByTestId } = componentWrapper();
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
    await waitForElement(() => getByTestId(TEST_IDS.CLOSE_ICON));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should fetch the chat list and set the state values', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    expect(getByText('johndoe_1')).toBeInTheDocument();
    getDataFromReference.mockReset();
  });
  it('Should fetch the chat list and not contain the loggedIn email address', async () => {
    getDataFromReference.mockReset();
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('success', 'same');
    mockGetFireStoreDocumentData('success', 'new');
    const { getByText, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_11'));
    expect(queryByText('johndoe_11')).toBeInTheDocument();
    getDataFromReference.mockReset();
  });
  it('Should fetch the chat list with failure cases', async () => {
    getDataFromReference.mockReset();
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
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should click on chat button and close the window', async () => {
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId, queryByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    expect(queryByTestId(TEST_IDS.SEND_MESSAGE)).not.toBeInTheDocument();
  });
  it('Should click on chat button and write message to send it', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and write message to send it and it gets failed', async () => {
    mockSetFirestoreDocumentData('failure');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId, queryByText } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    expect(getByTestId(TEST_IDS.SEND_MESSAGE)).toBeInTheDocument();
    fireEvent.change(getByTestId(TEST_IDS.MESSAGE_INPUT), {
      target: {
        value: 'Hello',
      },
    });
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    // state gets cleared
    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
  it('Should click on chat button and try to click on send button without any value', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success', '', '', 'chatWindow');
    mockGetDataFromReference('success', 'different');
    mockGetFireStoreDocumentData('success', 'old');
    const { getByText, getByTestId } = componentWrapper();
    await waitForElement(() => getByText('johndoe_1'));
    await waitForElement(() => getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    fireEvent.click(getByTestId(TEST_IDS.OPEN_CHAT_WINDOW));
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
  });
  it('Should select the value from dropdown and person data fails to fetch', async () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('success');
    mockGetDataFromReference('failure', 'different');
    mockGetFireStoreDocumentData('success', 'new', 'group');
    const { getByRole, getByTestId, queryByText } = componentWrapper();
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
    await waitForElement(() => getByTestId(TEST_IDS.SEND_MESSAGE));
    fireEvent.click(getByTestId(TEST_IDS.CLOSE_ICON));
    expect(queryByText('johndoe_9')).not.toBeInTheDocument();
  });
  it('Should render and match the snapshot', () => {
    mockSetFirestoreDocumentData('success');
    mockGetFireStoreDocumentReference();
    mockGetFireStoreCollectionReference('error');
    mockGetFireStoreDocumentData('success', 'new');
    mockGetDataFromReference('error', 'different');
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
