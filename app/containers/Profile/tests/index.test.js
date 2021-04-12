/**
 *
 * Tests for Profile
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from 'react-router-dom';
import history from 'utils/history';
import Profile from '../index';
import configureStore from '../../../configureStore';
import { DATA_TEST_IDS } from '../constants';

let store;

const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Profile />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<Profile />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should click Save Buttons', () => {
    const { getByTestId } = componentWrapper();
    fireEvent.click(getByTestId(DATA_TEST_IDS.ABOUT_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.ABOUT_SAVE));
    expect(getByTestId(DATA_TEST_IDS.ABOUT_EDIT)).toBeTruthy();
    fireEvent.click(getByTestId(DATA_TEST_IDS.EXPERIENCE_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.EXPERIENCE_SAVE));
    expect(getByTestId(DATA_TEST_IDS.EXPERIENCE_EDIT)).toBeTruthy();
    fireEvent.click(getByTestId(DATA_TEST_IDS.EDUCATION_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.EDUCATION_SAVE));
    expect(getByTestId(DATA_TEST_IDS.EDUCATION_EDIT)).toBeTruthy();
    fireEvent.click(getByTestId(DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT));
    fireEvent.click(getByTestId(DATA_TEST_IDS.LICENSEANDCERTIFICATION_SAVE));
    expect(
      getByTestId(DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT),
    ).toBeTruthy();
  });
});