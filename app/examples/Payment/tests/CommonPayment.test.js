import React from 'react';
import { render } from 'react-testing-library';

import CommonPaymentInput from '../CommonPaymentInput';

describe('<CommonPaymentInput />', () => {
  it('should render an <Card> tag', () => {
    const {
      container: { firstChild },
    } = render(<CommonPaymentInput />);
    expect(firstChild.tagName).toEqual('DIV');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<CommonPaymentInput />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });
});
