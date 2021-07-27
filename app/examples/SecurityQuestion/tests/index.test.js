import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
// import { createMemoryHistory } from 'history';
import request from 'utils/request';
// import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-dom/extend-expect';

import RegisterQuestion from '../RegisterQuestion/index';
import ResetPassword from '../ResetPassword/index';
import { registerSecurityQuestion } from '../stub';
// import { debug } from 'webpack';

jest.mock('utils/request');

// function renderWithRouter(
//   ui,
//   { route = '/', history = createMemoryHistory({ initialEntries: [route] }) },
// ) {
//   // eslint-disable-next-line react/prop-types
//   const Wrapper = ({ children }) => (
//     <Router history={history}>{children}</Router>
//   );
//   return {
//     ...render(ui, { wrapper: Wrapper }),
//     history,
//   };
// }
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
  it('should render an <StyledSecurityQuestion> tag', () => {
    const {
      container: { firstChild },
    } = render(<ResetPassword />);
    expect(firstChild.tagName).toEqual('DIV');
  });
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

  it('should adopt any attribute', () => {
    const { container } = render(<ResetPassword attribute="test" />);
    expect(container.firstChild.hasAttribute('attribute')).toBe(false);
  });

  it('should render <h3> tag', () => {
    const { getByText } = render(<RegisterQuestion />);
    const content = getByText('Register Secuirty Question');

    expect(content.textContent).toBe('Register Secuirty Question');
  });
  it('should render <h2> tag', () => {
    const { getByText } = render(<ResetPassword />);
    const content = getByText('Please Verify your security question');

    expect(content.textContent).toBe('Please Verify your security question');
  });

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = render(<ResetPassword isReset />);
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
});

// describe('register security quetsion mock', () => {
//   beforeEach(() => {
//     request.mockImplementation(getSecurityQuestions);
//   });

it('should call submit function call', async () => {
  request.mockImplementationOnce(() => {
    registerSecurityQuestion({ question1: 'abc', answer: 'abc' });
  });
  const { getAllByRole, getByTestId } = render(<RegisterQuestion />);
  await wait(() => expect(getAllByRole('combobox')[0]).toBeTruthy());
  // const que1 = getByTestId('question1').firstElementChild.firstElementChild.firstElementChild
  const ques = getAllByRole('combobox');
  fireEvent.mouseDown(ques[0]);
  // fireEvent.mouseDown(que1)
  fireEvent.click(
    document.querySelectorAll('.ant-select-item-option-content')[0],
  );
  // fireEvent.mouseDown(ques[1]);
  // fireEvent.click(
  //   document.querySelectorAll('.ant-select-item-option-content')[0],
  // );
  // eslint-disable-next-line no-console
  // console.log('ques[1]', ques[0].innerHTML);
  const eventObject = {
    // preventDefault: jest.fn(),
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
  // debug();
  await wait(() => fireEvent.click(submitbtn));
  expect(request).toHaveBeenCalledTimes(0);
  // await wait(() => {
  //   setTimeout(() => {
  //   }, 5000);
  // });
});
// });
