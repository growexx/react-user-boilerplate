import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { PersistGate } from 'redux-persist/integration/react';
import SideBar from '../index';
import configureStore from '../../../configureStore';
// let store;
let prevStore;
let prevPersistor;

const props = {
  user: {
    role: 1,
  },
  collapsed: true,
};
const componentWrapper = () =>
  render(
    <Provider store={prevStore}>
      <PersistGate persistor={prevPersistor}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <SideBar {...props} />
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>,
  );

describe('<SideBar />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
