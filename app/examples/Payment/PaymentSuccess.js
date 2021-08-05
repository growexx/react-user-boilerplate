import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spin } from 'antd';
import request from 'utils/request';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { StyledCardWrapper } from './StyledComponent';
import { ROUTES, PAYMENT_INTEGRATION_API } from '../../containers/constants';

function PaymentSuccess() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const queryParams =
    history && history.location
      ? new URLSearchParams(history.location.search)
      : '';
  const payType =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.payType;
  useEffect(() => {
    if (queryParams && !payType) {
      const reqData = {
        requesterId: queryParams.get('PayerID'),
        requestId: queryParams.get('paymentId'),
        gateway: 'paypal',
        amount: parseFloat(localStorage.getItem('amount')),
        currency: 'USD',
      };
      setIsLoading(true);
      request(`${PAYMENT_INTEGRATION_API.SUCCESS}`, {
        method: 'POST',
        body: reqData,
      })
        .then(() => {
          setIsLoading(false);
          localStorage.removeItem('amount');
        })
        .catch(() => {
          history.push(ROUTES.PAYMENT_FAILED);
        });
    }
  }, []);

  const renderQueryParam = () =>
    queryParams.get('paymentId') ? (
      <span>
        Your payment reference id:{' '}
        <strong>{queryParams.get('paymentId')}</strong>
      </span>
    ) : null;
  return (
    <StyledCardWrapper>
      {isLoading ? (
        <Spin />
      ) : (
        <div className="suceess-container">
          <div className="sub">
            <div className="success-icon-container">
              <CheckCircleTwoTone
                className="success-icon"
                twoToneColor="#52c41a"
              />
              <h1>Payment Succeful!</h1>
            </div>
            <div>{queryParams ? renderQueryParam() : null}</div>
          </div>
          <Button
            data-testid="redirect-btn"
            type="primary"
            onClick={() => {
              if (history) {
                history.replace(ROUTES.HOME);
              }
            }}
          >
            Go To Dashboard
          </Button>
        </div>
      )}
    </StyledCardWrapper>
  );
}

export default PaymentSuccess;
