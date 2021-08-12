import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
// import history from 'utils/history';

import Footer from '../index';
import configureStore from '../../../configureStore';
let prevStore;
let prevPersistor;

describe('<Footer />', () => {
  beforeAll(() => {
    // store = configureStore({}, browserHistory);
    const { store, persistor } = configureStore({}, browserHistory);
    prevStore = store;
    prevPersistor = persistor;
  });

  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={prevStore}>
          <PersistGate persistor={prevPersistor}>
            <IntlProvider locale="en">
              <Footer />
            </IntlProvider>
          </PersistGate>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
