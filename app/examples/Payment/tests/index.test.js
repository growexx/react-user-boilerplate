import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitForElement, wait } from 'react-testing-library';

import request from 'utils/request';
import Payments from '../index';

import { TEST_IDS } from '../../Users/constants';

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
describe('<Payments />', () => {
  it('shows a render list', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Payments />, div);
    expect(div.innerHTML).toContain('Payment Option');

    ReactDOM.unmountComponentAtNode(div);
  });
  it('should render an <StyledCardWrapper> tag', () => {
    const {
      container: { firstChild },
    } = render(<Payments />);
    expect(firstChild.tagName).toEqual('DIV');
  });

  it('should render Radio btn with paypal', () => {
    const { getByText } = render(<Payments />);
    const radio = getByText('Paypal');

    fireEvent.change(radio);
    expect(radio.textContent).toBe('Paypal');
  });
  it('should render Radio btn with braintree', () => {
    const { container } = render(<Payments />);
    const radio = container.getElementsByClassName('ant-radio-input')[1];

    fireEvent.change(radio);
    fireEvent.change(radio, { target: { value: 'Braintree' } });
    expect(radio.value).toBe('Braintree');
    // debug();

    // expect(radio.textContent).toBe('Braintree');
  });
  it('should call renderPayment function', async () => {
    const { getByText } = render(<Payments />);
    await waitForElement(() => getByText('Pay Now'));
    expect(getByText('Pay Now')).toBeTruthy();
  });

  it('should call handlePay function with paypal', async () => {
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const { getByText, getByTestId } = render(<Payments />);
    await waitForElement(() => getByText('Pay Now'));
    fireEvent.click(getByTestId(TEST_IDS.PAYNOW_BUTTON));
    expect(request).toHaveBeenCalled();
  });
  it('should call handlePay function with Braintree', async () => {
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const { getByText, getByTestId } = render(<Payments />);
    await waitForElement(() => getByText('Pay Now'));
    fireEvent.click(getByTestId(TEST_IDS.PAYNOW_BUTTON));
    expect(request).toHaveBeenCalled();
  });
  it('should call handlePay function with paypal', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const { getByText, getByTestId } = render(<Payments />);
    await waitForElement(() => getByText('Pay Now'));
    fireEvent.click(getByTestId(TEST_IDS.PAYNOW_BUTTON));
    expect(request).toHaveBeenCalled();
    // debug();
    localStorage.removeItem('products');
  });

  it('should change Radio Button to Braintree', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: { key: 'abc1212shjsaiisiusia' } }),
    );
    const { getByText, getByTestId } = render(<Payments />);
    await wait(() => {
      const wrapper = getByTestId('radio-group').firstElementChild;
      fireEvent.click(wrapper.firstElementChild.nextElementSibling);
      expect(getByText('Braintree')).toBeTruthy();
    });
    await wait(() => fireEvent.click(getByTestId('braintree-paybtn')));
    // debug();
    expect(request).toHaveBeenCalled();
  });
  it('should change Radio Button to Stripe', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const { getByText, debug, getByTestId } = render(<Payments />);
    await wait(() => {
      const wrapper = getByTestId('radio-group').firstElementChild;
      fireEvent.click(
        wrapper.firstElementChild.nextElementSibling.nextElementSibling,
      );
      expect(getByText('Stripe')).toBeTruthy();
      debug();
    });
  });
  it('should change Radio Button to Square', async () => {
    localStorage.setItem('products', JSON.stringify(dummyData));
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const { getByText, getByTestId } = render(<Payments />);
    await wait(() => {
      const wrapper = getByTestId('radio-group').firstElementChild;
      fireEvent.click(
        wrapper.firstElementChild.nextElementSibling.nextElementSibling
          .nextElementSibling,
      );
    });
    expect(getByText('Square')).toBeTruthy();
  });
});
