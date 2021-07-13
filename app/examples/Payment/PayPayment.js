import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import request from 'utils/request';
import PaypalLogo from '../../images/paypal_logo_150px.png';
import PaytmLogo from '../../images/paytm.png';
import { PAYMENT_INTEGRATION_API } from '../../containers/constants';
import { TEST_IDS } from '../Users/constants';

function PayPayment(props) {
  const { type, amount } = props;

  const productData = JSON.parse(localStorage.getItem('products'));
  // console.log(productData)
  const totalAmount =
    productData && productData.length
      ? productData.reduce((accu, product) => accu + product.price, 0)
      : 0;

  const handlePay = paymentType => {
    const reqData = {
      gateway: paymentType,
      amount: totalAmount,
      currency: 'USD',
    };
    request(`${PAYMENT_INTEGRATION_API.PAY}`, {
      method: 'POST',
      body: reqData,
    }).then(res => {
      window.location.replace(res.data);
    });
  };
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
              Pay Now <DollarCircleOutlined /> {totalAmount}
            </Button>
          </div>
        </div>
      );

    case 'Paytm':
      return (
        <div>
          <img className="paytm_logo" src={PaytmLogo} alt="paytm_logo" />
          <div>
            <Button>Pay Now &#x20b9; {amount}</Button>
          </div>
        </div>
      );

    default:
      return null;
  }
}
PayPayment.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.string,
};

export default PayPayment;
