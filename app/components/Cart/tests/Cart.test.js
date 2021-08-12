import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';
import products from '../../../examples/Products/stub/product.json';

import Cart from '../index';
import configureStore from '../../../configureStore';

const dummyData = products.products.slice(0, 2);

describe('<Cart />', () => {
  const history = createMemoryHistory();
  // let store = configureStore({}, history);
  // let store;
  let prevStore;
  let prevPersistor;
  // const { store, persistor } = configureStore({}, createMemoryHistory);
  // prevStore = store;
  // prevPersistor = persistor;

  it('should render a div', () => {
    const { store, persistor } = configureStore({}, createMemoryHistory);
    prevStore = store;
    prevPersistor = persistor;
    const { container } = render(
      <Provider store={prevStore}>
        <PersistGate persistor={prevPersistor}>
          <IntlProvider locale="en">
            <ConnectedRouter history={history}>
              <Cart />
            </ConnectedRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<Cart />', () => {
  test('display should update Carts', () => {
    window.product = dummyData;
    window.localStorage = {};
    window.localStorage.setItem = (key, value) => {
      window.localStorage[key] = value;
    };
    window.localStorage.getItem = key => window.localStorage[key];
    const { getByTestId } = render(<Cart />);
    window.localStorage.setItem('products', JSON.stringify(dummyData));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value',
      }),
    );
    fireEvent.click(getByTestId('badge-Cart'));

    expect(getByTestId('badge-cart-drawer')).toBeTruthy();
  });
});
