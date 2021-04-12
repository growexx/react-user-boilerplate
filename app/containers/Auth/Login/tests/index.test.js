/**
 *
 * Tests for Login
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import * as ReactRedux from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Login } from '../index';
import Lodable from '../Loadable';
import configureStore from '../../../../configureStore';
let store;
const props = {
  error: true,
};
const componentWrapper = Component =>
  render(
    <ReactRedux.Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Component {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </ReactRedux.Provider>,
  );
describe('<Login />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Login);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should dispatch events', () => {
    const spiedDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    const { getByPlaceholderText } = componentWrapper(Login);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: 'it@growexx.com',
      },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: {
        value: 'it@growexx.com',
      },
    });
    expect(spiedDispatch).toBeCalled();
  });
});
