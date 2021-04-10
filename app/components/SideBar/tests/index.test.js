import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import * as gaHelper from 'utils/googleAnalytics';
import { MenuItems } from '../Constants';
import SideBar from '../index';
import configureStore from '../../../configureStore';
let store;
const props = {
  user: {
    role: 1,
  },
  collapsed: true,
};
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <SideBar {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<SideBar />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });

  it('should log ga event', () => {
    const spiedEvent = jest.spyOn(gaHelper, 'eventGA');
    const { getByText } = componentWrapper();
    fireEvent.click(getByText(MenuItems[0].tabName));
    expect(spiedEvent).toHaveBeenCalled();
  });
});
