import React from 'react';
import { render } from 'react-testing-library';
// import request from 'utils/request';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import PasswordChange from '../ResetPassword/PasswordChange';
import configureStore from '../../../configureStore';

describe('<ResetPassword />', () => {
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
