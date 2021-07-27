import React from 'react';
import { render } from 'react-testing-library';
import PasswordChange from '../ResetPassword/PasswordChange';

describe('<PasswordChange />', () => {
  it('should render an <div> tag', () => {
    const {
      container: { firstChild },
    } = render(<PasswordChange />);
    expect(firstChild.tagName).toEqual('FORM');
  });
});
