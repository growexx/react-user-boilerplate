import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
// import { DollarCircleOutlined } from '@ant-design/icons';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import request from 'utils/request';
import Payments from '../index';
// import PaymentSuccess from '../PaymentSuccess';
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
  // it('should change Radio Button Value', async () => {
  //   const { container, getByText } = render(<Payments />);
  //   fireEvent.click(container.getElementsByClassName('ant-radio-input')[1]);
  //   await waitForElement(() => getByText('Pay Now ₹ 0'));
  //   expect(getByText('Pay Now ₹ 0')).toBeTruthy();
  // });
  // it('should change Radio Button Value', async () => {
  //   const { getByTestId } = render(<Payments />);
  //   await waitForElement(() => getByTestId('braintree-paybtn'));
  //   // debug();
  //   fireEvent.click(getByTestId('braintree-paybtn'));
  // expect(getByText('Pay Now  0')).toBeTruthy();
  // });
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
  // it('should call handlePay function with braintree', async () => {
  //   localStorage.setItem('products', JSON.stringify(dummyData));
  //   request.mockImplementationOnce(() =>
  //     Promise.resolve({ data: 'testValue' }),
  //   );

  //   const { getByTestId } = render(<Payments />);
  //   // await waitForElement(() =>
  //   //   getByText(`Pay Now ${<DollarCircleOutlined />} 100`),
  //   // );
  //   fireEvent.click(getByTestId('braintree-paybtn'));
  //   expect(request).toHaveBeenCalled();
  //   localStorage.removeItem('products');
  // });
  it('should change Radio Button Value', async () => {
    const { container, getByText, debug } = render(<Payments />);
    fireEvent.click(container.getElementsByClassName('ant-radio-input')[1]);
    expect(getByText('Braintree')).toBeTruthy();
    debug();
    // await waitForElement(() => getByText('Pay Now ₹ 100'));
    // expect(getByText('Pay Now ₹ 100')).toBeTruthy();
  });
  // it('should render queryparams function with queryparams', async () => {
  //   const { container, getByText } = render(<Payments />);
  //   await waitForElement(() => getByText('Go To Dashboard'));
  //   request.mockImplementationOnce(() =>
  //     Promise.resolve({ data: 'testValue' }),
  //     fireEvent.click(container.getByTestId('redirect-btn'));
  //   // expect(getByText('Go To Dashboard')).toBeTruthy();
  // });
});
