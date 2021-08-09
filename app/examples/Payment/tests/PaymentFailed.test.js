import React from 'react';
import { render, wait } from 'react-testing-library';
import request from 'utils/request';
import PropTypes from 'prop-types';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import PaymentFailed from '../PaymentFailed';

const props = {};
jest.mock('utils/request');

const componentWrapper = updatedProps =>
  render(<PaymentFailed {...props} {...updatedProps} />);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) },
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  Wrapper.propTypes = {
    children: PropTypes.any,
  };
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
}
describe('<PaymentFailed />', () => {
  it('should render with no props', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
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
    } = renderWithRouter(<PaymentFailed />, {
      route:
        '/gateway/success?paymentId=PAYID-MDVHWHY88Y576948Y3372059&token=EC-72S425174G792992P&PayerID=YJT84LQ2W7GU8',
    });
    expect(firstChild).toMatchSnapshot();
  });
});

describe('<PaymentFailed /> reject', () => {
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
