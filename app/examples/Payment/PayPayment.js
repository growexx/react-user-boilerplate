import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import PaypalLogo from '../../images/paypal_logo_150px.png';

function PayPayment(props) {
  const { type, amount } = props;
  const handlePaypalPay = () => {};
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
      return null;

    default:
      return null;
  }
}
PayPayment.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.string,
};

export default PayPayment;
