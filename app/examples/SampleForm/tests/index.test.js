/**
 *
 * Tests for SampleForm
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { ConnectedRouter } from 'connected-react-router';
import SampleForm from '../index';
import configureStore from '../../../configureStore';
let store;
const props = {
  handleSubmit: jest.fn(),
  pristine: true,
  reset: true,
  submitting: true,
};
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <SampleForm {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<SampleForm />', () => {
  beforeEach(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should click submit button', () => {
    props.pristine = false;
    const { container } = componentWrapper();
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(props.handleSubmit).toBeCalled();
  });
  it('Should change form fields', () => {
    const eventObject = {
      preventDefault: jest.fn(),
      target: {
        value: 'test',
        name: 'test',
        checked: true,
      },
    };
    const { getByPlaceholderText, getByTestId } = componentWrapper();
    fireEvent.change(getByPlaceholderText('First Name'), eventObject);
    fireEvent.change(getByPlaceholderText('Last Name'), eventObject);
    fireEvent.change(getByPlaceholderText('Email'), eventObject);
    fireEvent.change(getByTestId('Favorite Color Select'));
    fireEvent.change(getByTestId('Notes'), eventObject);
  });
});
