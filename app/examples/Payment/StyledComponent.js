import styled from 'styled-components';

export const StyledCardWrapper = styled.div`
  .common-payment-main {
    width: 60%;
  }
  .continue-btn {
    height: 42px;
    margin-left: 10%;
  }
  .payment-main-card {
    display: flex;
  }
  h2 {
    height: 42px;
    width: 100%;
    margin-bottom: 30px;
    paddind: 20px;
  }
  .logo {
    margin-top: 1.5rem;
  }
  .pay_btn {
    margin-top: 1.5rem;
  }
  .paytm_logo {
    height: 100px;
  }
  .suceess-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & .sub {
      padding: 1rem 0px;
    }
    & h1 {
      color: #52c41a;
      padding-left: 1rem;
    }
  }
  .success-icon-container {
    display: flex;
    justify-content: center;
  }
  .success-icon {
    font-size: 3rem;
  }
`;
