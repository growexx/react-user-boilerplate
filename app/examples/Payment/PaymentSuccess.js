import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { StyledCardWrapper } from './StyledComponent';
import { ROUTES } from '../../containers/constants';

function PaymentSuccess() {
  const history = useHistory();
  const queryParams = new URLSearchParams(history.location.search);

  return (
    <StyledCardWrapper>
      <div className="suceess-container">
        <div className="sub">
          <div className="success-icon-container">
            <CheckCircleTwoTone
              className="success-icon"
              twoToneColor="#52c41a"
            />
            <h1>Payment Succeful!</h1>
          </div>
          <div>
            {queryParams.get('paymentId') ? (
              <span>
                Your payment reference id:{' '}
                <strong>{queryParams.get('paymentId')}</strong>
              </span>
            ) : null}
          </div>
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
    </StyledCardWrapper>
  );
}

export default PaymentSuccess;
