/**
 *
 * Tests for ChatList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from 'configureStore';
import ChatList from 'examples/RealTimeChat/index';
jest.mock('utils/Helper', () => ({
  getUserData: jest.fn().mockReturnValue({
    email: 'johnDoe@growexx.com',
  }),
}));
let store;
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <ChatList />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<ChatList />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
