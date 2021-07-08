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

  useEffect(() => {
    if (queryParams) {
      setIsLoading(true);
      request(
        `${PAYMENT_INTEGRATION_API.SUCCESS}?PayerID=${queryParams.get(
          'PayerID',
        )}&paymentId=${queryParams.get('paymentId')}`,
        {
          method: 'GET',
        },
      )
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
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
            type="primary"
            onClick={() => {
              history.replace(ROUTES.HOME);
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