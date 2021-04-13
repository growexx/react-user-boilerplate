/**
 *
 * Tests for GraphQLDemo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { getRatesMock } from 'graphql/Rates/ApiMocks/rates';
import GraphQLDemo from '../index';
import configureStore from '../../../configureStore';
let store;
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <MockedProvider mocks={getRatesMock} addTypename="false">
            <GraphQLDemo />
          </MockedProvider>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<GraphQLDemo />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', async () => {
    await act(async () => {
      const {
        container: { firstChild },
      } = componentWrapper();
      expect(firstChild).toMatchSnapshot();
    });
  });
});
