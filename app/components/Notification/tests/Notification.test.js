import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';

import Notification from '../index';
import configureStore from '../../../configureStore';

const dummyData = [
  {
    id: 1,
    title: 'Product1',
    description: 'Description 1',
    imageUrl:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    price: 100,
    qty: 1,
  },
];

describe('<Notification />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <Notification />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('<Notification />', () => {
  test('display should update notifications', () => {
    window.product = dummyData;
    window.localStorage = {};
    window.localStorage.setItem = (key, value) => {
      window.localStorage[key] = value;
    };
    window.localStorage.getItem = key => window.localStorage[key];
    const { getByTestId } = render(<Notification />);
    window.localStorage.setItem('products', JSON.stringify(dummyData));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value',
      }),
    );
    fireEvent.click(getByTestId('badge-notification'));

    expect(getByTestId('badge-cart-drawer')).toBeTruthy();
  });
});
