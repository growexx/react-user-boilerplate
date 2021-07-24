import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { userExists } from 'utils/Helper';
import Login from 'containers/Auth/Login/Loadable';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../../configureStore';
import AuthRoute from '../AuthRoute';
jest.mock('utils/Helper');
const props = {
  component: Login,
};
// let store;
let prevStore;
let prevPersistor;
const componentWrapper = () =>
  render(
    <Provider store={prevStore}>
      <PersistGate persistor={prevPersistor}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <AuthRoute {...props} />
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>,
  );

describe('<MainLayout />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
    userExists.mockImplementation(() => true);
  });
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('with login', () => {
    const { container } = componentWrapper();
    expect(container.tagName).toBe('DIV');
  });
  it('with logout', () => {
    userExists.mockImplementation(() => false);
    const { container } = componentWrapper();
    expect(container.tagName).toBe('DIV');
  });
});
