/**
 *
 * TwoFactorAuthentication
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OtpComponent from 'components/OtpComponent';
import makeSelectTwoFactorAuthentication from './selectors';
import reducer from './reducer';
import saga from './saga';
import { StyledTwoFactorAuthentication } from './StyledTwoFactorAuthentication';
import messages from './messages';
import AuthSideContainer from '../index';
import { AUTH_TYPE } from '../constants';
import { StyledAuthContainer } from '../StyledAuthContainer';

export function TwoFactorAuthentication() {
  useInjectReducer({ key: 'twoFactorAuthentication', reducer });
  useInjectSaga({ key: 'twoFactorAuthentication', saga });

  return (
    <div>
      <Helmet>
        <title>TwoFactorAuthentication</title>
        <meta
          name="description"
          content="Description of TwoFactorAuthentication"
        />
      </Helmet>
      <StyledAuthContainer>
        <AuthSideContainer authType={AUTH_TYPE[0]} />
        <StyledTwoFactorAuthentication>
          <p className="twoFactorAuthenticationTitle">
            <FormattedMessage {...messages.twoFactorAuthenticationTitle} />
          </p>
          <OtpComponent />
        </StyledTwoFactorAuthentication>
      </StyledAuthContainer>
    </div>
  );
}

TwoFactorAuthentication.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  twoFactorAuthentication: makeSelectTwoFactorAuthentication(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TwoFactorAuthentication);
