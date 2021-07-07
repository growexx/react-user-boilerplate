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
    paytm: defaultPaymentValue,
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
  const onPaytmInputChange = e => {
    setPaymentValue({
      ...payemntValue,
      paytm: {
        ...payemntValue.paytm,
        input: e.target.value,
      },
    });
  };
  const onPaypalLinkClick = () => {};
  const onPaytmLinkClick = () => {};
  const onPaypalContinueClick = () => {};

  const onPaytmContinueClick = () => {};

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
      return (
        <CommonPaymentInput
          inputPlaceholder="Enter Paytm Linked No."
          onInputChange={onPaytmInputChange}
          onLinkClick={onPaytmLinkClick}
          onContinueClick={onPaytmContinueClick}
          continueBtnDisable={payemntValue.paytm.btnDisable}
          inputValue={payemntValue.paytm.input}
        />
      );
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
