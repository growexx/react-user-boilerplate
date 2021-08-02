import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Spin } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import dropin from 'braintree-web-drop-in';
import request from 'utils/request';
import { useHistory } from 'react-router-dom';
import PaypalLogo from '../../images/paypal_logo_150px.png';
import BrainTreeLogo from '../../images/Braintree_Payments_Logo.png';
import StripeLogo from '../../images/stripe_logo.png';
import SquareLogo from '../../images/square_logo.png';
import { PAYMENT_INTEGRATION_API, ROUTES } from '../../containers/constants';
import { TEST_IDS } from '../Users/constants';
import StripePayment from './StripePayment';
import SquarePayment from './SquarePayment';
function PayPayment(props) {
  const history = useHistory();
  const { type, amount } = props;
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const productData = JSON.parse(localStorage.getItem('products'));
  const totalAmount =
    productData && productData.length
      ? productData.reduce((accu, product) => accu + product.price, 0)
      : 0;

  const handlePay = paymentType => {
    const reqData = {
      gateway: paymentType,
      amount: totalAmount || amount,
      currency: 'USD',
    };
    request(`${PAYMENT_INTEGRATION_API.PAY}`, {
      method: 'POST',
      body: reqData,
    }).then(res => {
      switch (paymentType) {
        case 'paypal':
          window.location.replace(res.data.key);
          break;
        case 'braintree':
          setToken(res.data.key);
          dropin.create(
            {
              authorization: res.data.key,
              container: '#dropin-container',
            },
            (createErr, instance) =>
              requestPaymentBraintree(createErr, instance, reqData),
          );
          break;
        case 'stripe':
          setToken(res.data.key);
          break;
        case 'square':
          setToken(res.data.key);
          break;
        default:
          break;
      }
    });
  };

  const requestPaymentBraintree = (createErr, instance, reqData) => {
    const button = document.getElementById('braintreebtn');
    button.addEventListener('click', () => {
      instance.requestPaymentMethod(async (err, payload) => {
        setIsLoading(true);
        Object.assign(reqData, { requestId: payload.nonce });
        request(`${PAYMENT_INTEGRATION_API.SUCCESS}`, {
          method: 'POST',
          body: reqData,
        })
          .then(res => {
            setIsLoading(false);
            history.push({
              pathname: ROUTES.PAYMENT_SUCCESS,
              search: `?paymentId=${res.data.transactionId}`,
              state: { payType: 'braintree' },
            });
          })
          .catch(() => {
            setIsLoading(false);
          });
      });
    });
  };

  const renderBrainTree = () =>
    !token ? (
      <div>
        <img className="paytm_logo" src={BrainTreeLogo} alt="braintree_logo" />
        <div>
          <Button
            data-testid="braintree-paybtn"
            onClick={() => handlePay('braintree')}
          >
            Pay Now <DollarCircleOutlined /> {totalAmount || amount}
          </Button>
        </div>
      </div>
    ) : (
      <div>
        <div id="dropin-container" />
        <Button id="braintreebtn">Request payment method</Button>
      </div>
    );

  const requestPaymentStripe = (stripe, paymentMethod) => {
    stripe.handleCardAction(`${paymentMethod.id}`).then(data => {
      if (data.error) {
        // eslint-disable-next-line no-console
        console.error('Your card was not authenticated, please try again');
      } else if (data.paymentIntent.status === 'requires_confirmation') {
        setIsLoading(true);
        const reqData = {
          gateway: 'stripe',
          amount: totalAmount,
          currency: 'USD',
          requestId: data.id,
        };

        request(`${PAYMENT_INTEGRATION_API.SUCCESS}`, {
          method: 'POST',
          body: reqData,
        })
          .then(res => {
            // eslint-disable-next-line no-console
            console.log('res', res);
            setIsLoading(false);
            // history.push({
            //   pathname: ROUTES.PAYMENT_SUCCESS,
            //   search: `?paymentId=${res.data.transactionId}`,
            //   state: { payType: 'stripe' },
            // });
          })
          .catch(() => {
            // console.log('err',err)
            setIsLoading(false);
          });
      }
    });
  };
  const renderStripePayment = () =>
    !token ? (
      <div>
        <img className="paytm_logo" src={StripeLogo} alt="stripe_logo" />
        <div>
          <Button
            data-testid="stripe-paybtn"
            onClick={() => handlePay('stripe')}
          >
            Pay Now <DollarCircleOutlined /> {totalAmount || amount}
          </Button>
        </div>
      </div>
    ) : (
      <StripePayment
        token={token}
        requestPaymentStripe={requestPaymentStripe}
      />
    );

  const renderSquarePayment = () =>
    !token ? (
      <div>
        <img className="paytm_logo" src={SquareLogo} alt="square_logo" />
        <div>
          <Button
            data-testid="stripe-paybtn"
            onClick={() => handlePay('square')}
          >
            Pay Now <DollarCircleOutlined /> {totalAmount || amount}
          </Button>
        </div>
      </div>
    ) : (
      <SquarePayment />
    );

  switch (type) {
    case 'Paypal':
      return (
        <div className="logo">
          <img src={PaypalLogo} alt="paypal_logo" />
          <div>
            <Button
              className="pay_btn"
              data-testid={TEST_IDS.PAYNOW_BUTTON}
              onClick={() => handlePay('paypal')}
            >
              Pay Now <DollarCircleOutlined /> {totalAmount || amount}
            </Button>
          </div>
        </div>
      );

    case 'Braintree':
      return <div>{isLoading ? <Spin /> : renderBrainTree()}</div>;
    case 'Stripe':
      return <div>{isLoading ? <Spin /> : renderStripePayment()}</div>;
    case 'Square':
      return <div>{isLoading ? <Spin /> : renderSquarePayment()}</div>;

    default:
      return null;
  }
}
PayPayment.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.string,
};

export default PayPayment;
