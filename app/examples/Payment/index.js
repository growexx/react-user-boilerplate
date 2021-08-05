import React, { useEffect, useState } from 'react';
import { Radio, Spin } from 'antd';
import { StyledCardWrapper } from './StyledComponent';
import PayPayment from './PayPayment';

export default function Payments() {
  const [paymentOption, setPaymentOption] = useState('Paypal');
  const [isAccountLinked, setIsAccountLinked] = useState({
    isLoading: true,
    linked: false,
  });

  useEffect(() => {
    checkAcoountLinked();
  }, []);

  const checkAcoountLinked = () => {
    setIsAccountLinked({ isLoading: true });
    setTimeout(() => {
      setIsAccountLinked({ isLoading: false, linked: true });
    }, 1000);
  };
  const onRadioBtnChange = e => {
    setPaymentOption(e.target.value);
    checkAcoountLinked();
  };
  const renderPayment = () => <PayPayment type={paymentOption} amount="100" />;
  return (
    <StyledCardWrapper>
      <div>
        <h2>Payment Option</h2>
      </div>
      <div data-testid="radio-group">
        <Radio.Group onChange={onRadioBtnChange} value={paymentOption}>
          <Radio value="Paypal">Paypal</Radio>
          <Radio value="Braintree">Braintree</Radio>
          <Radio value="Stripe">Stripe</Radio>
          <Radio value="Square">Square</Radio>
        </Radio.Group>
      </div>
      {isAccountLinked.isLoading ? <Spin /> : renderPayment()}
    </StyledCardWrapper>
  );
}
