import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import request from 'utils/request';
import StripePayment from '../StripePayment';

jest.mock('utils/request');
const props = {
  token: 'abc1234',
  requestPaymentStripe: () => {},
};
describe('<StripePayment />', () => {
  it('should render with token', () => {
    const {
      container: { firstChild },
    } = render(<StripePayment {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should submit form called', () => {
    request.mockImplementationOnce(() =>
      Promise.resolve({ data: 'testValue' }),
    );
    const { getByTestId } = render(<StripePayment {...props} />);
    const button = getByTestId('stripePayBtn');
    fireEvent.click(button);
  });
});
