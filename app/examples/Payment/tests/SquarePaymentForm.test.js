import React from 'react';
import { render } from 'react-testing-library';

import SquarePaymentForm from '../SquarePaymentForm';

const inputEventType = {
  eventType: 'focusClassAdded',
  cardBrand: '',
};
const configProp = {
  applicationId: 'abcde',
  locationId: 'abcde1234',
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
        amount: 100,
        pending: false,
      },
      lineItems: [
        {
          label: 'Subtotal',
          amount: 100,
          pending: false,
        },
      ],
    }),
    cardNonceResponseReceived: (errors, nonce) => {
      if (errors) {
        this.requestPaymentSquare('');
      } else {
        this.requestPaymentSquare(nonce);
      }
    },
    inputEventReceived: (inputEvent = inputEventType) => {
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
const props = {
  appId: '1234abc',
  location: 'aloc1234',
  amount: '100',
  requestPaymentSquare: () => {},
  PaymentForm: () => ({ build: () => {} }),
};
describe('<SquarePaymentForm />', () => {
  it('should render with appId and location', () => {
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with card nounce error', () => {
    props.PaymentForm = (config = configProp) => {
      config.callbacks.cardNonceResponseReceived({}, '');
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with card nounce', () => {
    props.PaymentForm = (config = configProp) => {
      config.callbacks.cardNonceResponseReceived(false, 'abcd1234');
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type focusClassAdded', () => {
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type focusClassRemoved', () => {
    inputEventType.eventType = 'focusClassRemoved';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type errorClassAdded', () => {
    inputEventType.eventType = 'errorClassAdded';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type errorClassRemoved', () => {
    inputEventType.eventType = 'errorClassRemoved';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type cardBrandChanged with no card', () => {
    inputEventType.eventType = 'cardBrandChanged';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type cardBrandChanged with card', () => {
    inputEventType.eventType = 'cardBrandChanged';
    inputEventType.cardBrand = 'visa';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type postalCodeChanged', () => {
    inputEventType.eventType = 'postalCodeChanged';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should render with event type not matched', () => {
    inputEventType.eventType = 'abcd';
    props.PaymentForm = (config = configProp) => {
      config.callbacks.inputEventReceived(inputEventType);
      return { build: () => {} };
    };
    const {
      container: { firstChild },
    } = render(<SquarePaymentForm {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
