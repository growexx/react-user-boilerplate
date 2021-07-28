import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import ResetPasswordMain from '../ResetPassword/ResetPasswordMain';

describe('SampleComponent', () => {
  test('should render', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <ResetPasswordMain />
        </MemoryRouter>,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
