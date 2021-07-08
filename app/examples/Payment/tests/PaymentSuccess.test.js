import React from 'react';
import { render } from 'react-testing-library';

import PaymentSuccess from '../PaymentSuccess';
const props = {};

const componentWrapper = updatedProps =>
  render(<PaymentSuccess {...props} {...updatedProps} />);

describe('<PaymentSuccess />', () => {
  it('should render with no props', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
