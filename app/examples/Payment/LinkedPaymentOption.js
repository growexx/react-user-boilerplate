import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommonPaymentInput from './CommonPaymentInput';
const defaultPaymentValue = {
  btnDisable: true,
  input: '',
};

function LinkedPaymentOption(props) {
  const [payemntValue, setPaymentValue] = useState({
    paypal: defaultPaymentValue,
  });
  const onPaypalInputChange = e => {
    setPaymentValue({
      ...payemntValue,
      paypal: {
        ...payemntValue.paypal,
        input: e.target.value,
      },
    });
  };

  const onPaypalLinkClick = () => {};

  const onPaypalContinueClick = () => {};

  const { type } = props;
  switch (type) {
    case 'Paypal':
      return (
        <CommonPaymentInput
          inputPlaceholder="Enter Paypal Linked No."
          onInputChange={onPaypalInputChange}
          onLinkClick={onPaypalLinkClick}
          onContinueClick={onPaypalContinueClick}
          continueBtnDisable={payemntValue.paypal.btnDisable}
          inputValue={payemntValue.paypal.input}
        />
      );
    case 'Paytm':
      return null;
    case 'Net_Banking':
      return null;

    default:
      return null;
  }
}

LinkedPaymentOption.propTypes = {
  type: PropTypes.string,
};

export default LinkedPaymentOption;
