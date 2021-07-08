import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Payments from '../index';

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

    fireEvent.click(radio);
    expect(radio.textContent).toBe('Paypal');
  });
  it('should render Radio btn with paypal', () => {
    const { getByText } = render(<Payments />);
    const radio = getByText('Paytm');

    fireEvent.click(radio);
    expect(radio.textContent).toBe('Paytm');
  });
});
