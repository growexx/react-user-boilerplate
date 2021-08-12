import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
import request from 'utils/request';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
// import ReactDOM from 'react-router-dom';

import RegisterQuestion from '../RegisterQuestion/index';
import ResetPassword from '../ResetPassword/index';
import { registerSecurityQuestion } from '../stub';
import configureStore from '../../../configureStore';

jest.mock('utils/request');

export async function selectOption(
  container,
  optionText,
  getByText,
  findByText,
  keyDownEvent,
) {
  const placeholder = getByText(container, 'Select...');
  fireEvent.keyDown(placeholder, keyDownEvent);
  await findByText(container, optionText);
  fireEvent.click(getByText(container, optionText));
}

describe('<ResetPassword />', () => {
  it('should match snapshot', () => {
    const history = createMemoryHistory();
    const store = configureStore({}, history);

    // it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ResetPassword />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
it('should match snapshot', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  // it('should render a div', () => {
  const { container } = render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <RegisterQuestion />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
  expect(container.firstChild).toMatchSnapshot();
});
// });
// it('shows a render list', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<RegisterQuestion />, div);
//   expect(div.innerHTML).toContain('Set Security Question');

//   ReactDOM.unmountComponentAtNode(div);
// });

it('should render an <StyledSecurityQuestion> tag', () => {
  const {
    container: { firstChild },
  } = render(<RegisterQuestion />);
  expect(firstChild.tagName).toEqual('DIV');
});

it('should render an <StyledSecurityQuestion> tag', () => {
  const {
    container: { firstChild },
  } = render(<RegisterQuestion />);
  expect(firstChild.tagName).toMatchSnapshot();
});
// it('should render an <StyledSecurityQuestion> tag', () => {
//   const {
//     container: { firstChild },
//   } = render(<ResetPassword />);
//   expect(firstChild.tagName).toMatchSnapshot();
// });

it('should adopt any attribute', () => {
  const { container } = render(<RegisterQuestion attribute="test" />);
  expect(container.firstChild.hasAttribute('attribute')).toBe(false);
});

it('should render and match the snapshot', () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
  const {
    container: { firstChild },
  } = render(<RegisterQuestion />);
  expect(firstChild).toMatchSnapshot();
});

it('should render and match the snapshot', async () => {
  request.mockImplementation(registerSecurityQuestion);
  const {
    container: { firstChild },
  } = render(<RegisterQuestion />);

  await wait(() => expect(request).toHaveBeenCalledTimes(0));
  expect(firstChild).toMatchSnapshot();
});
// });

it('should call submit function call', async () => {
  request.mockImplementationOnce(() => {
    registerSecurityQuestion({ question1: 'abc', answer: 'abc' });
  });
  const { getAllByRole, getByTestId } = render(<RegisterQuestion />);
  await wait(() => expect(getAllByRole('combobox')[0]).toBeTruthy());
  const ques = getAllByRole('combobox');
  fireEvent.mouseDown(ques[0]);
  fireEvent.click(
    document.querySelectorAll('.ant-select-item-option-content')[0],
  );

  const eventObject = {
    target: {
      value: 'test',
      name: 'test',
    },
  };
  fireEvent.change(getByTestId('answer1'), eventObject);
  fireEvent.change(getByTestId('answer2'), eventObject);
  fireEvent.change(getByTestId('answer3'), eventObject);
  const submitbtn = getByTestId('submit_question');
  submitbtn.setAttribute('disabled', false);

  expect(submitbtn).toBeDisabled();
  await wait(() => fireEvent.click(submitbtn));
  expect(request).toHaveBeenCalledTimes(0);
});
