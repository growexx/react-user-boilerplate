import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from '../configureStore';
const store = configureStore({}, history);

export const WrappedStoryComponent = (Component, args = {}) => (
  <Provider store={store}>
    <IntlProvider locale="en">
      <ConnectedRouter history={history}>
        <Component {...args} />
      </ConnectedRouter>
    </IntlProvider>
  </Provider>
);
