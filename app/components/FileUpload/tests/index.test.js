/**
 *
 * Tests for FileUpload
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import FileUpload from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<FileUpload />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <FileUpload />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
