/**
 *
 * Tests for OtpComponent
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import OtpComponent from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<OtpComponent />', () => {
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <OtpComponent />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
