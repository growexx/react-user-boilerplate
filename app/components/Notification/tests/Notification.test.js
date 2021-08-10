import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';

import Notification from '../index';
import configureStore from '../../../configureStore';

describe('<Notification />', () => {
  const history = createMemoryHistory();
  const initialState = {};
  const { store, persistor } = configureStore(initialState, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider locale="en">
            <ConnectedRouter history={history}>
              <Notification />
            </ConnectedRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
