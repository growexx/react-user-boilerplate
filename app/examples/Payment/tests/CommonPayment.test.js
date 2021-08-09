import React from 'react';
import { render } from 'react-testing-library';

import CommonPaymentInput from '../CommonPaymentInput';

describe('<CommonPaymentInput />', () => {
  it('should render with continue btn disable', () => {
    const props = {
      inputPlaceholder: 'abc',
      onInputChange: () => {},
      onLinkClick: () => {},
      onContinueClick: () => {},
      continueBtnDisable: false,
      inputValue: 'abc',
    };
    const {
      container: { firstChild },
    } = render(<CommonPaymentInput {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
