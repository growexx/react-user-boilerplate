/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * ProfileForm Form
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Card } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FileUpload from 'components/FileUpload/Loadable';
import makeSelectProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { StyledProfile } from './StyledProfile';

export function ProfileForm() {
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'profile', saga });

  return (
    <div>
      <Helmet>
        <title>ProfileForm</title>
        <meta name="description" content="Description of ProfileForm" />
      </Helmet>
      Pratibha Hotwani <br />
      Jr Software Engineer at Growexx <br />
      Ahmedabad, Gujarat, India <br />
      <br />
      <br />
      <Card hoverable type="inner" title="About" extra={<a href="#">edit</a>}>
        I am a Front End Developer with industry experience building on websites
        and web applications.
        <br />I specialize in JavaScript and have professional experience
        working with React-JS.
        <br />I also possess good command on Unit Testing using Jest, Enzyme and
        React Testing Library.
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Experience"
        extra={<a href="#">edit</a>}
      >
        I am a Front End Developer with industry experience building on websites
        and web applications.
        <br />I specialize in JavaScript and have professional experience
        working with React-JS.
        <br />I also possess good command on Unit Testing using Jest, Enzyme and
        React Testing Library.
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Education"
        extra={<a href="#">edit</a>}
      >
        I am a Front End Developer with industry experience building on websites
        and web applications.
        <br />I specialize in JavaScript and have professional experience
        working with React-JS.
        <br />I also possess good command on Unit Testing using Jest, Enzyme and
        React Testing Library.
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Licenses and Certificates"
        extra={<a href="#">edit</a>}
      >
        I am a Front End Developer with industry experience building on websites
        and web applications.
        <br />I specialize in JavaScript and have professional experience
        working with React-JS.
        <br />I also possess good command on Unit Testing using Jest, Enzyme and
        React Testing Library.
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Upload Resume"
        extra={<a href="#">edit</a>}
      >
        <FileUpload />
      </Card>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
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

export default compose(
  withConnect,
  memo,
)(ProfileForm);
