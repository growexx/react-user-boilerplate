/**
 *
 * Tests for TwoFactorAuthentication
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { ConnectedRouter } from 'connected-react-router';
import { TwoFactorAuthentication } from '../index';
import configureStore from '../../../../configureStore';
let store;
const props = {
  error: true,
};
const componentWrapper = Component =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Component {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<TwoFactorAuthentication />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(TwoFactorAuthentication);
    expect(firstChild).toMatchSnapshot();
  });
});
