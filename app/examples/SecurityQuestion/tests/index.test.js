import React from 'react';
import { render, wait, fireEvent, waitForElement } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import request from 'utils/request';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterQuestion from '../RegisterQuestion/index';
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
  });

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
      const que1 = getByTestId('question1').firstElementChild;

      fireEvent.mouseDown(que1);

      fireEvent.keyDown(que1, keyDownEvent);

      const ans1 = getByTestId('answer1');
      const ans2 = getByTestId('answer2');
      const ans3 = getByTestId('answer3');
      fireEvent.change(ans1, { target: { value: 'whamo' } });
      fireEvent.change(ans2, { target: { value: 'whamo' } });
      fireEvent.change(ans3, { target: { value: 'whamo' } });

      debug();
    });
  });
});
