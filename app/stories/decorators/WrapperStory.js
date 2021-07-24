import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../configureStore';
const store = configureStore({}, history);
const persistor = configureStore({}, history);

const WrapperStory = props => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
      </IntlProvider>
    </PersistGate>
  </Provider>
);

export default WrapperStory;

WrapperStory.propTypes = {
  children: PropTypes.element,
};
