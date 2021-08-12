import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import PasswordChange from '../ResetPassword/PasswordChange';
import configureStore from '../../../configureStore';

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
  it('should render an <StyledSecurityQuestion> tag', () => {
    //   const {
    //     container: { firstChild },
    //     debug,
    //   } = render(<ResetPassword />);
    //   debug();
    //   expect(firstChild.tagName).toEqual('DIV');
    // });
    const history = createMemoryHistory();
    const store = configureStore({}, history);

    // it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <PasswordChange />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
