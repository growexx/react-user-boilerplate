/**
 * Testing the UnauthorizedPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Unauthorized from '../index';
import messages from '../messages';

describe('<Unauthorized />', () => {
  it('should render the Unauthorized Page text', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <Unauthorized />
      </IntlProvider>,
    );
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
