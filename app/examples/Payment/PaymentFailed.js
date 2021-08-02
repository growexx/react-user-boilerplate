import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { StyledCardWrapper } from './StyledComponent';
// import { StyledCardWrapper } from './StyledComponent';

function PaymentFailed() {
  return (
    <StyledCardWrapper>
      <div className="suceess-container">
        <div className="sub">
          <div className="success-icon-container">
            <CloseCircleOutlined
              className="success-icon"
              style={{ color: 'red' }}
            />
            <h1 style={{ color: 'red' }}>Payment Failed!</h1>
          </div>
        </div>
      </div>
    </StyledCardWrapper>
  );
}

export default PaymentFailed;
