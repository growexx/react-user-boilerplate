/**
 *
 * Tests for Users
 *
 */

import React from 'react';
import { fireEvent, render, waitForElement, wait } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'utils/history';
import request from 'utils/request';
import { ConnectedRouter } from 'connected-react-router';
import Users, { mapDispatchToProps } from '../index';
import configureStore from '../../../configureStore';
import {
  addNewUserFailure,
  addNewUserSuccess,
  failedResponse,
  responseWithList,
  responseWithZeroList,
  USER_DATA,
} from '../stub';
import { TEST_IDS } from '../constants';
jest.mock('utils/request');

let store;
const props = {
  pristine: true,
  reset: true,
  submitting: true,
};

const fieldUpdateViaPlaceHolder = [
  {
    key: 'First Name',
    value: USER_DATA.NAME,
  },
  {
    key: 'Last Name',
    value: USER_DATA.URL,
  },
  {
    key: 'Email',
    value: USER_DATA.EMAIL,
  },
];

const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Users {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('Check component:<ConnectedJiraList /> is rendering properly', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
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

  it('mapDispatch to props', () => {
    const mockFn = jest.fn();
    const returnValue = mapDispatchToProps(mockFn);
    returnValue.updateField(
      { target: { name: 'email' } },
      { target: { value: USER_DATA.EMAIL } },
    );

    expect(mockFn).toBeCalled();
  });

  it('Click: New User Modal should show modal', async () => {
    const { getByTestId, getByText } = componentWrapper();
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();

    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));
    fireEvent.click(getByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('Click Delete: Show Confirmation Modal', async () => {
    const { getByTestId, getByText } = componentWrapper();
    await waitForElement(() => getByText('Active'));

    // Click Delete Button
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON));

    // Check Elements are showing
    expect(getByText('OK', { trim: true })).toBeTruthy();
  });
});

describe.skip('Check listing of users is rendering properly', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('No Records found for users', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('No Data'));
    expect(getByText('No Data')).toBeTruthy();
  });

  it('Users Listing with few records should be shown', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('No Data'));

    expect(getByText(USER_DATA.EMAIL)).toBeTruthy();
  });

  it('Users Listing with pagination', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
    const { getByText, getByTitle } = componentWrapper();
    await waitForElement(() => getByText(USER_DATA.EMAIL));

    expect(getByText(USER_DATA.EMAIL)).toBeTruthy();
    fireEvent.click(getByTitle('2'));
  });

  it('Failed Users Listing api', async () => {
    request.mockImplementationOnce(() => Promise.reject(failedResponse));
    const { getByText } = componentWrapper();
    await waitForElement(() => getByText('No Data'));
    expect(getByText('No Data')).toBeTruthy();
  });
});

describe.skip('New Users', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Add new users with success', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper();
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();
    fireEvent.click(getByText('Add User'));
  });

  it('Add new user with cancel option', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()));

    const { getByTestId, getByText } = componentWrapper();
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.USER_MODAL_CANCEL));
  });

  it('Add new jira with failure', () => {
    request.mockImplementation(() => Promise.reject(addNewUserFailure()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper();
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));

    // Update Fields
    fieldUpdateViaPlaceHolder.forEach(d => {
      fireEvent.change(getByPlaceholderText(d.key), {
        target: { value: d.value },
      });
    });

    // Check Elements are showing
    expect(getByText('Add User')).toBeTruthy();
    fireEvent.click(getByText('Add User'));
  });
});

describe.skip('Update User', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Update jira with success', async () => {
    request
      .mockImplementationOnce(() => Promise.resolve(responseWithList()))
      .mockImplementationOnce(() => Promise.resolve(addNewUserSuccess()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Update Fields
    fieldUpdateViaPlaceHolder
      .filter(item => item.key !== 'JIRA url')
      .forEach(d => {
        fireEvent.change(getByPlaceholderText(d.key), {
          target: { value: d.value },
        });
      });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.ADD_USER));
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('Update jira with cancel', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.CONNECT_JIRA_CANCEL_BUTTON));
  });

  it('Jira Update failure', async () => {
    request
      .mockImplementationOnce(() => Promise.resolve(responseWithList()))
      .mockImplementationOnce(() => Promise.resolve(addNewUserFailure()));

    const { getByTestId, getByText, getByPlaceholderText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.EDIT_BUTTON));

    // Update Fields
    fieldUpdateViaPlaceHolder
      .filter(item => item.key !== 'JIRA url')
      .forEach(d => {
        fireEvent.change(getByPlaceholderText(d.key), {
          target: { value: d.value },
        });
      });

    // Check Elements are showing
    expect(getByText('Update')).toBeTruthy();
    fireEvent.click(getByText('Update'));
  });
});

describe.skip('Individual record actions', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()));
  });

  afterEach(() => {
    request.mockClear();
  });

  it('Click: Sync Logs should show modal', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));

    const { getByTestId, getByText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.SYNC_INDIVIDUAL_BUTTON));

    // Check Elements are showing
    expect(getByText('Period')).toBeTruthy();
  });

  it('Click: Delete Jira should show confirmation popup', async () => {
    request
      .mockImplementationOnce(() => Promise.resolve(responseWithList()))
      .mockImplementationOnce(() => Promise.resolve({ status: 1 }));

    const { getByTestId, getByText } = componentWrapper();
    await wait(() => expect(request).toHaveBeenCalledTimes(1));
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.DELETE_BUTTON));

    // Check Elements are showing
    expect(getByText('Are you sure you want to Delete?')).toBeTruthy();
    fireEvent.click(getByTestId(TEST_IDS.POPUP_OK_BUTTON));
  });

  it('Click: Disable Jira should show confirmation popup', async () => {
    request.mockImplementationOnce(() =>
      Promise.resolve(responseWithList({ isActive: true })),
    );

    const { getByTestId, getByText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));

    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.DISABLE_BUTTON));

    // Check Elements are showing
    expect(getByText('Are you sure you want to Disable?')).toBeTruthy();
  });

  it('Click: Activate Jira should show confirmation popup and confirm should update status', async () => {
    request
      .mockImplementationOnce(() =>
        Promise.resolve(responseWithList({ isActive: false })),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ status: 1, message: 'Updated' }),
      );

    const { getByTestId, getByText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.DISABLE_BUTTON));
    fireEvent.click(getByTestId(TEST_IDS.POPUP_OK_BUTTON));
  });

  it('Click: Activate Jira should show confirmation popup and confirm should failed api', async () => {
    request
      .mockImplementationOnce(() =>
        Promise.resolve(responseWithList({ isActive: false })),
      )
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Something went wrong')),
      );

    const { getByTestId, getByText } = componentWrapper();
    await waitForElement(() => getByText(USER_DATA.EMAIL));
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.DISABLE_BUTTON));
    fireEvent.click(getByTestId(TEST_IDS.POPUP_OK_BUTTON));
  });

  it('Click: Activate Jira should show confirmation popup and then cancel popup', async () => {
    request.mockImplementationOnce(() =>
      Promise.resolve(responseWithList({ isActive: false })),
    );

    const { getByTestId, getByText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.DISABLE_BUTTON));
    fireEvent.click(getByTestId(TEST_IDS.POPUP_CANCEL_BUTTON));
  });

  it('Click: Sync Logs should show modal and cancel modal', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()));
    const { getByTestId, getByText } = componentWrapper();
    expect(request).toHaveBeenCalledTimes(1);
    await waitForElement(() => getByText(USER_DATA.EMAIL));
    // Fire Event
    fireEvent.click(getByTestId(TEST_IDS.SYNC_INDIVIDUAL_BUTTON));
    fireEvent.click(getByTestId(TEST_IDS.SYNC_CANCEL_BUTTON));
  });
});
