import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const styles = {
  name: {
    verticalAlign: 'top',
    display: 'none',
    margin: 0,
    border: 'none',
    fontSize: '16px',
    fontFamily: 'Helvetica Neue',
    padding: '16px',
    color: '#373F4A',
    backgroundColor: 'transparent',
    lineHeight: '1.15em',
    placeholderColor: '#000',
    _webkitFontSmoothing: 'antialiased',
    _mozOsxFontSmoothing: 'grayscale',
  },
  leftCenter: {
    float: 'left',
    textAlign: 'center',
  },
  blockRight: {
    display: 'block',
    float: 'right',
  },
  center: {
    textAlign: 'center',
  },
};

class SquarePaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBrand: '',
      //   nonce: undefined,
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  componentDidMount() {
    const config = {
      applicationId: 'sq0idp-rARHLPiahkGtp6mMz2OeCA',
      locationId: 'GMT96A77XABR1',
      inputClass: 'sq-input',
      autoBuild: false,
      inputStyles: [
        {
          fontSize: '16px',
          fontFamily: 'Helvetica Neue',
          padding: '16px',
          color: '#373F4A',
          backgroundColor: 'transparent',
          lineHeight: '1.15em',
          placeholderColor: '#000',
          _webkitFontSmoothing: 'antialiased',
          _mozOsxFontSmoothing: 'grayscale',
        },
      ],
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '• • • •  • • • •  • • • •  • • • •',
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV',
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY',
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Zip',
      },
      callbacks: {
        createPaymentRequest: () => ({
          requestShippingAddress: false,
          requestBillingInfo: true,
          currencyCode: 'USD',
          countryCode: 'US',
          total: {
            label: 'MERCHANT NAME',
            amount: '100',
            pending: false,
          },
          lineItems: [
            {
              label: 'Subtotal',
              amount: '100',
              pending: false,
            },
          ],
        }),
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            // console.log('Encountered errors:');
            // errors.forEach(function(error) {
            //   console.log('  ' + error.message);
            // });
            // eslint-disable-next-line no-console
            console.log(cardData);
          } else {
            //   this.setState({
            //     nonce,
            //   });
          }
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              break;
            case 'focusClassRemoved':
              break;
            case 'errorClassAdded':
              document.getElementById('error').innerHTML =
                'Please fix card information errors before continuing.';
              break;
            case 'errorClassRemoved':
              document.getElementById('error').style.display = 'none';
              break;
            case 'cardBrandChanged':
              if (inputEvent.cardBrand !== 'unknown') {
                this.setState({
                  cardBrand: inputEvent.cardBrand,
                });
              } else {
                this.setState({
                  cardBrand: '',
                });
              }
              break;
            case 'postalCodeChanged':
              break;
            default:
              break;
          }
        },
        paymentFormLoaded() {
          document.getElementById('name').style.display = 'inline-flex';
        },
      },
    };
    this.paymentForm = new this.props.PaymentForm(config);
    this.paymentForm.build();
  }

  render() {
    return (
      <div className="container">
        <div id="form-container">
          <div id="sq-ccbox">
            <p>
              <span style={styles.leftCenter}>Enter Card Info Below </span>
              <span style={styles.blockRight}>
                {this.state.cardBrand.toUpperCase()}
              </span>
            </p>
            <div id="cc-field-wrapper">
              <div id="sq-card-number" />
              <input type="hidden" id="card-nonce" name="nonce" />
              <div id="sq-expiration-date" />
              <div id="sq-cvv" />
            </div>
            <input
              id="name"
              style={styles.name}
              type="text"
              placeholder="Name"
            />
            <div id="sq-postal-code" />
          </div>
          <Button
            className="button-credit-card"
            onClick={this.requestCardNonce}
          >
            Pay
          </Button>
        </div>
        <p style={styles.center} id="error" />
      </div>
    );
  }
}
SquarePaymentForm.propTypes = {
  PaymentForm: PropTypes.func,
};

export default SquarePaymentForm;
