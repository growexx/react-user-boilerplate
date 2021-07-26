import React from 'react';
import {
  render,
  wait,
  // waitForElement,
  fireEvent,
  waitForElement,
  // screen,
  // act,
  // screen,
  // userEvent,
} from 'react-testing-library';
// import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import request from 'utils/request';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterQuestion from '../RegisterQuestion/index';
// import { getRegisteredSecurityQuestion, getSecurityQuestions } from '../stub';
// import SelectInput from '../SelectInput';
import ResetPassword from '../ResetPassword/index';
import { getSecurityQuestions, registerSecurityQuestion } from '../stub';

jest.mock('utils/request');

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) },
) {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
}
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

  // it('should have a className attribute', () => {
  //   const { container } = render(<ResetPassword />);
  //   expect(container.firstChild.hasAttribute('class')).toBe(false);
  // });
  it('should render an <StyledSecurityQuestion> tag', () => {
    const {
      container: { firstChild },
    } = render(<RegisterQuestion />);
    expect(firstChild.tagName).toMatchSnapshot();
  });

  // it('should have a className attribute', () => {
  //   const { container } = render(<RegisterQuestion />);
  //   expect(container.firstChild.hasAttribute('class')).toBe(false);
  // });

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

  // it('should render with props isReset', () => {
  //   const {
  //     container: { firstChild },
  //   } = render(<ResetPassword isReset />);
  //   expect(firstChild).toMatchSnapshot();
  // });

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = render(<ResetPassword isReset />);
    expect(firstChild).toMatchSnapshot();
  });
  // it('should render and match the snapshot', async () => {
  //   request.mockImplementation(() =>
  //     Promise.resolve({
  //       status: 1,
  //       results: [
  //         {
  //           name: {
  //             last: 'testInfiniteLoader',
  //             email: 'test@234.com',
  //           },
  //         },
  //       ],
  //     }),
  //   );
  //   const {
  //     container: { firstChild },
  //   } = render(<ResetPassword />);

  //   await wait(() => expect(request).toHaveBeenCalledTimes(0));
  //   expect(firstChild).toMatchSnapshot();
  // });

  it('should render and match the snapshot', async () => {
    request.mockImplementation(getSecurityQuestions);
    const {
      container: { firstChild },
    } = render(<RegisterQuestion />);

    await wait(() => expect(request).toHaveBeenCalledTimes(0));
    expect(firstChild).toMatchSnapshot();
  });
});

describe('register security quetsion mock', () => {
  beforeEach(() => {
    request.mockImplementation(getSecurityQuestions);
    // request.mockImplementation(() => Promise.resolve({}));
  });
  // it('should change Radio Button Value', async () => {
  //   const { container, getByText } = render(<RegisterQuestion />);
  //   fireEvent.change(
  //     container.getElementsByClassName('ant-select-selection-item')[0],
  //   );
  //   await waitForElement(() => getByText(' -- Choose a Security Question --'));
  //   expect(getByText(' -- Choose a Security Question --')).toBeTruthy();
  // });
  it('should call submit function call', async () => {
    request.mockImplementationOnce(registerSecurityQuestion);

    const { getByTestId, debug } = renderWithRouter(
      <RegisterQuestion
        handlesubmit={data => {
          registerSecurityQuestion(data);
        }}
      />,
      {
        route: '/resgiter-security-questions',
      },
    );
    const keyDownEvent = {
      key: 'ArrowDown',
    };
    await waitForElement(async () => {
      // fireEvent.keyDown(que1, keyDownEvent);
      // fireEvent.keyDown(que2, keyDownEvent);
      // fireEvent.keyDown(que3, keyDownEvent);
      // await selectOption(
      //   getByTestId(que1),
      //   "What is your mother's maiden name?",
      //   getByText,
      //   findByText,
      //   keyDownEvent,
      // );
      // fireEvent.change(ans1);
      // fireEvent.change(ans2);
      // fireEvent.change(ans3);
      const que1 = getByTestId('question1').firstElementChild;
      // const que1Input = que1.firstElementChild;
      // const que2 = getByTestId('question2');
      // const que3 = getByTestId('question3');
      fireEvent.mouseDown(que1);
      // const que1Select1 = firstChild.getElementsByClassName(
      //   'ant-select-selection-item',
      // )[0];
      // const que1Select2 = firstChild.getElementsByClassName(
      //   'ant-select-selection-item',
      // )[1];
      // const que1Select3 = firstChild.getElementsByClassName(
      //   'ant-select-selection-item',
      // )[2];
      // eslint-disable-next-line no-console
      // fireEvent.mouseDown(que1);
      fireEvent.keyDown(que1, keyDownEvent);

      // que1Select1.setAttribute('title', "What is your mother's maiden name?");
      // que1Select2.setAttribute(
      //   'title',
      //   'Where did you go to high school/college?',
      // );
      // que1Select3.setAttribute(
      //   'title',
      //   'What is the name of the road you grew up on?',
      // );
      // fireEvent.change(que1Input, {
      //   target: { value: "What is your mother's maiden name?" },
      // });

      // fireEvent.click(que1);
      // fireEvent.mouseDown(que2);
      // fireEvent.keyDown(que2, keyDownEvent);
      // fireEvent.mouseDown(que3);
      // fireEvent.keyDown(que3, keyDownEvent);

      // await waitForElement(() => getByText('Submit'));
      // expect(request).toHaveBeenCalledTimes(1);

      const ans1 = getByTestId('answer1');
      const ans2 = getByTestId('answer2');
      const ans3 = getByTestId('answer3');
      fireEvent.change(ans1, { target: { value: 'whamo' } });
      fireEvent.change(ans2, { target: { value: 'whamo' } });
      fireEvent.change(ans3, { target: { value: 'whamo' } });

      debug();
      // await waitForElement(() =>
      //   getByText("What is your mother's maiden name?"),
      // );
      // expect(getByText("What is your mother's maiden name?")).toBeTruthy();
      // expect(getByText("What is your mother's maiden name")).toBeVisible();
      // fireEvent.change(que1, {
      //   target: { value: "What is your mother's maiden name?" },
      // });

      // const elem = getByTestId('submit_question');
      // elem.removeAttribute('disabled');
    });

    // fireEvent.click(elem);
    // debug();
    // wait(() => expect(request).toHaveBeenCalled());
  });
});
