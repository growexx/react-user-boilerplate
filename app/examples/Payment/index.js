import React, { useEffect, useState } from 'react';
import { Radio, Spin } from 'antd';
import { StyledCardWrapper } from './StyledComponent';
import LinkedPaymentOption from './LinkedPaymentOption';
import PayPayment from './PayPayment';

const { Group } = Radio;

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
  const renderPayment = () =>
    isAccountLinked.linked ? (
      <PayPayment type={paymentOption} amount="10" />
    ) : (
      <LinkedPaymentOption type={paymentOption} />
    );
  return (
    <StyledCardWrapper>
      <div>
        <h2>Payment Option</h2>
      </div>
      <div>
        <Group onChange={onRadioBtnChange} value={paymentOption}>
          <Radio value="Paypal">Paypal</Radio>
          <Radio value="Paytm">Paytm</Radio>
          <Radio value="Net_Banking">Net Banking</Radio>
        </Group>
      </div>
      {isAccountLinked.isLoading ? <Spin /> : renderPayment()}
    </StyledCardWrapper>
  );
}
