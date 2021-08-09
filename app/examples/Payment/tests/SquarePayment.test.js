import React from 'react';
import { render } from 'react-testing-library';

import SquarePayment from '../SquarePayment';

describe('<SquarePayment />', () => {
  it('should render with appId and location', () => {
    const props = {
      appId: '1234abc',
      location: 'aloc1234',
      amount: '100',
      requestPaymentSquare: () => {},
    };
    const {
      container: { firstChild },
    } = render(<SquarePayment {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
