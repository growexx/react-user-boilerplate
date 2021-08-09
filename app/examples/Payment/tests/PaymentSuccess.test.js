import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
import request from 'utils/request';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import PaymentSuccess from '../PaymentSuccess';

const props = {};
jest.mock('utils/request');

const componentWrapper = updatedProps =>
  render(<PaymentSuccess {...props} {...updatedProps} />);

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
describe('<PaymentSuccess />', () => {
  it('should render with no props', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('should click go to dashboard btn', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(<PaymentSuccess />);
    const btn = getByTestId('redirect-btn');
    fireEvent.click(btn);
    expect(history.location.pathname).toBe('/');
  });
  it('should redner when loading false', async () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        data: 'data recieved',
        message: 'Success',
      }),
    );

    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });

  test('payment success redirect', async () => {
    const {
      container: { firstChild },
    } = renderWithRouter(<PaymentSuccess />, {
      route:
        '/gateway/success?paymentId=PAYID-MDVHWHY88Y576948Y3372059&token=EC-72S425174G792992P&PayerID=YJT84LQ2W7GU8',
    });
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<PaymentSuccess /> reject', () => {
  it('should redner when promise reject', async () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    request.mockImplementation(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        status: 0,
        error: 'sometihng went wrong',
      }),
    );

    await wait(() => {
      expect(firstChild).toMatchSnapshot();
    });
  });
});
