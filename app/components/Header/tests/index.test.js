import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';

import Header from '../index';
import { StyledAppHeader } from '../StyledAppHeader';
import configureStore from '../../../configureStore';

describe('<Header />', () => {
  const history = createMemoryHistory();
  // const store = configureStore({}, history);
  const initialState = {};
  const { store, persistor } = configureStore(initialState, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider locale="en">
            <ConnectedRouter history={history}>
              <Header />
            </ConnectedRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider locale="en">
            <ConnectedRouter history={history}>
              <Header menuBackground />
            </ConnectedRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>,
    );
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider locale="en">
            <ConnectedRouter history={history}>
              <StyledAppHeader menuBackground />
            </ConnectedRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a div with props', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider locale="en">
            <ConnectedRouter history={history}>
              <StyledAppHeader />
            </ConnectedRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
