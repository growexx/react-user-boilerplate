import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SquarePaymentForm from './SquarePaymentForm';
import { SquarePaymentWrapper } from './SquarePaymentWrapper';

class SquarePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    const that = this;
    const SquarePaymentScript = document.createElement('script');
    SquarePaymentScript.src = 'https://js.squareupsandbox.com/v2/paymentform';
    SquarePaymentScript.type = 'text/javascript';
    SquarePaymentScript.async = false;
    SquarePaymentScript.onload = () => {
      that.setState({
        loaded: true,
      });
    };
    document.getElementsByTagName('head')[0].appendChild(SquarePaymentScript);
  }

  render() {
    const { appId, location, amount, requestPaymentSquare } = this.props;
    return (
      this.state.loaded && (
        <SquarePaymentWrapper>
          <SquarePaymentForm
            PaymentForm={window.SqPaymentForm}
            appId={appId}
            location={location}
            amount={amount}
            requestPaymentSquare={requestPaymentSquare}
          />
        </SquarePaymentWrapper>
      )
    );
  }
}

SquarePayment.propTypes = {
  appId: PropTypes.string,
  location: PropTypes.string,
  amount: PropTypes.string,
  requestPaymentSquare: PropTypes.func,
};

export default SquarePayment;
