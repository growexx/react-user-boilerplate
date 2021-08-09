import React from 'react';
import { fireEvent, render, wait } from 'react-testing-library';
import request from 'utils/request';
import { TEST_IDS } from '../../Users/constants';
import PayPayment from '../PayPayment';
jest.mock('utils/request');
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
describe('<PayPayment />', () => {
  it('should render braintree', () => {
    const props = {
      type: 'Braintree',
      amount: '100',
    };
    const {
      container: { firstChild },
    } = render(<PayPayment {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render stripe', () => {
    const props = {
      type: 'Stripe',
      amount: '100',
    };
    const {
      container: { firstChild },
    } = render(<PayPayment {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render square', () => {
    const props = {
      type: 'Square',
      amount: '100',
    };
    const {
      container: { firstChild },
    } = render(<PayPayment {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render null', () => {
    const props = {
      type: '',
      amount: '100',
    };
    const {
      container: { firstChild },
    } = render(<PayPayment {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should call handlePay paypal', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const props = {
      type: 'Paypal',
      amount: '100',
    };
    const { getByTestId } = render(<PayPayment {...props} />);

    await wait(() => fireEvent.click(getByTestId(TEST_IDS.PAYNOW_BUTTON)));
    expect(request).toHaveBeenCalled();
    localStorage.removeItem('products');
  });
  it('should call handlePay braintree', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const props = {
      type: 'Braintree',
      amount: '100',
    };
    const { getByTestId } = render(<PayPayment {...props} />);

    await wait(() => fireEvent.click(getByTestId('braintree-paybtn')));
    expect(request).toHaveBeenCalled();
    localStorage.removeItem('products');
  });
  it('should call handlePay stripe', async () => {
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const props = {
      type: 'Stripe',
      amount: '100',
    };
    const { getByTestId } = render(<PayPayment {...props} />);

    await wait(() => fireEvent.click(getByTestId('stripe-paybtn')));
    expect(request).toHaveBeenCalled();
  });
  it('should call handlePay square', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const props = {
      type: 'Square',
      amount: '100',
    };
    const { getByTestId } = render(<PayPayment {...props} />);

    await wait(() => fireEvent.click(getByTestId('square-paybtn')));
    expect(request).toHaveBeenCalled();
    localStorage.removeItem('products');
  });
});
