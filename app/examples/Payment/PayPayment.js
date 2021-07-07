import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import request from 'utils/request';
import PaypalLogo from '../../images/paypal_logo_150px.png';
import PaytmLogo from '../../images/paytm.png';
import { PAYMENT_INTEGRATION_API } from '../../containers/constants';

const mockData = {
  payer: {
    payment_method: 'paypal',
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: 'Growexx Service',
            sku: '001',
            price: `10.00`,
            currency: 'INR',
            quantity: 1,
          },
        ],
      },
      amount: {
        currency: 'INR',
        total: `10.00`,
      },
      description: 'Growexx It Service',
    },
  ],
};
function PayPayment(props) {
  const { type, amount } = props;
  const handlePaypalPay = () => {
    request(PAYMENT_INTEGRATION_API.PAY, {
      method: 'POST',
      body: mockData,
    }).then(res => {
      window.location.replace(res);
    });
  };
  switch (type) {
    case 'Paypal':
      return (
        <div className="logo">
          <img src={PaypalLogo} alt="paypal_logo" />
          <div>
            <Button className="pay_btn" onClick={handlePaypalPay}>
              Pay Now &#x20b9; {amount}
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
