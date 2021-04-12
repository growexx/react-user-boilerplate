/**
 *
 * Tests for ImageUpload
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import ImageUpload from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ImageUpload />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ImageUpload />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
