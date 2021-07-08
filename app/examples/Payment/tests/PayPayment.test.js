import React from 'react';
import { render } from 'react-testing-library';
import PayPayment from '../PayPayment';

const props = {};

const componentWrapper = updatedProps =>
  render(<PayPayment {...props} {...updatedProps} />);

describe('<PayPayment/>', () => {
  it('should render with no props', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with props type paypal', () => {
    const {
      container: { firstChild },
    } = componentWrapper({
      type: 'Paypal',
      amount: '10',
    });
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with props type paytm', () => {
    const {
      container: { firstChild },
    } = componentWrapper({
      type: 'Paytm',
      amount: '10',
    });
    expect(firstChild).toMatchSnapshot();
  });
});
