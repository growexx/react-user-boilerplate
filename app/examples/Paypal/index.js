/* eslint-disable react/jsx-indent-props */
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import request from 'utils/request';
import { Helmet } from 'react-helmet';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Result } from 'antd';
import { Wrapper } from './styled';
import { CLIENT_ID, CREATE_URL, CAPTURE_URL } from './constants';
/* eslint-disable-next-line react/prefer-stateless-function */
class Paypal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Paypal</title>
          <meta name="description" content="Description of paypal" />
        </Helmet>
        {!this.state.success && (
          <>
            <Title level={2}>Complete the Payment</Title>
            <Title level={2}> $100 </Title>
            <Text type="secondary" className="warning-line">
              By clicking below button you will be redirected to Payment gateway
            </Text>
            <PayPalScriptProvider
              options={{
                'client-id': CLIENT_ID,
              }}
            >
              <PayPalButtons
                className="paypal-buttons"
                createOrder={() =>
                  request(CREATE_URL, {
                    method: 'POST',
                    body: {},
                  })
                    .then(response => response.data.id)
                    .catch(err => console.log(err))
                }
                onApprove={data =>
                  request(CAPTURE_URL, {
                    method: 'POST',
                    body: {
                      orderId: data.orderID,
                    },
                  })
                    .then(() => this.setState({ success: true }))
                    .catch(err => console.log(err))
                }
              />
            </PayPalScriptProvider>
          </>
        )}
        {this.state.success && (
          <Result
            status="success"
            title="Transaction completed successfully"
            subTitle="Your payment of $100 is completed successfully."
          />
        )}
      </Wrapper>
    );
  }
}

Paypal.propTypes = {};

export default Paypal;
