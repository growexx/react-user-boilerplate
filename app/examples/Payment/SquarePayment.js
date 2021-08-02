import React, { Component } from 'react';
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
    SquarePaymentScript.src = 'https://js.squareup.com/v2/paymentform';
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
    return (
      this.state.loaded && (
        <SquarePaymentWrapper>
          <SquarePaymentForm PaymentForm={window.SqPaymentForm} />
        </SquarePaymentWrapper>
      )
    );
  }
}

export default SquarePayment;
