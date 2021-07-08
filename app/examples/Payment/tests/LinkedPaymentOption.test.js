import React from 'react';
import { render } from 'react-testing-library';
import LinkedPaymentOption from '../LinkedPaymentOption';

const props = {};

const componentWrapper = updatedProps =>
  render(<LinkedPaymentOption {...props} {...updatedProps} />);

describe('<LinkedPaymentOption/>', () => {
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
    });
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with props type paytm', () => {
    const {
      container: { firstChild },
    } = componentWrapper({
      type: 'Paytm',
    });
    expect(firstChild).toMatchSnapshot();
  });
});
