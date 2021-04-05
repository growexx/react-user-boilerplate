/**
 *
 * Tests for SampleForm
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render, queryByAttribute } from 'react-testing-library';
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
    const { getByText } = componentWrapper();
    const button = getByText('Submit');
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
    const {
      getByPlaceholderText,
      getByTestId,
      getByRole,
      container,
    } = componentWrapper();
    const getById = queryByAttribute.bind(null, 'id');
    fireEvent.change(getByPlaceholderText('First Name'), eventObject);
    fireEvent.change(getByPlaceholderText('Last Name'), eventObject);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: 'TestEmail',
        name: 'email',
      },
    });
    fireEvent.click(getById(container, 'employed'), eventObject);
    fireEvent.click(getByRole('combobox'));
    fireEvent.change(getByTestId('Notes'), eventObject);
    fireEvent.click(getByPlaceholderText('From'));
    fireEvent.focus(getByPlaceholderText('From'), eventObject);
    fireEvent.blur(getByPlaceholderText('From'), eventObject);
    expect(getByPlaceholderText('First Name')).toBeTruthy();
  });
});
