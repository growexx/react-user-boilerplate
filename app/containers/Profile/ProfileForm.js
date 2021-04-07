/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * ProfileForm Form
 *
 */

import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Card, Button } from 'antd';
import FileUpload from 'components/FileUpload/Loadable';
import { CardExtraContainer } from './StyledProfile';
import { PROFILE_PLACEHOLDER } from './constants';
import messages from './messages';
import RichTextEditor from '../../components/RichTextEditor';

class ProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      aboutContent: PROFILE_PLACEHOLDER,
      experienceContent: PROFILE_PLACEHOLDER,
      educationContent: PROFILE_PLACEHOLDER,
      licensesAndCertificationsContent: PROFILE_PLACEHOLDER,
      editAbout: false,
      editExperience: false,
      editEducation: false,
      editLicensesAndCertifications: false,
    };
  }

  isEditModeOn = state => {
    console.log('coming', this.state[state]);
    return this.state[state] === true;
  };

  render() {
    const {
      aboutContent,
      educationContent,
      experienceContent,
      licensesAndCertificationsContent,
    } = this.state;
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
        <Card
          hoverable
          type="inner"
          title="About"
          extra={
            <CardExtraContainer>
              {this.isEditModeOn('editAbout') ? (
                <Button
                  onClick={() => {
                    this.setState({ editAbout: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    this.setState({ editAbout: true });
                  }}
                >
                  <FormattedHTMLMessage {...messages.edit} />
                </Button>
              )}
            </CardExtraContainer>
          }
        >
          {this.isEditModeOn('editAbout') ? (
            <RichTextEditor />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: aboutContent,
              }}
            />
          )}
        </Card>
        <br />
        <Card
          hoverable
          type="inner"
          title="Experience"
          extra={
            <CardExtraContainer>
              {this.isEditModeOn('editExperience') ? (
                <Button
                  onClick={() => {
                    this.setState({ editExperience: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    this.setState({ editExperience: true });
                  }}
                >
                  <FormattedHTMLMessage {...messages.edit} />
                </Button>
              )}
            </CardExtraContainer>
          }
        >
          {this.isEditModeOn('editExperience') ? (
            <RichTextEditor />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: experienceContent,
              }}
            />
          )}
        </Card>
        <br />
        <Card
          hoverable
          type="inner"
          title="Education"
          extra={
            <CardExtraContainer>
              {this.isEditModeOn('editEducation') ? (
                <Button
                  onClick={() => {
                    this.setState({ editEducation: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    this.setState({ editEducation: true });
                  }}
                >
                  <FormattedHTMLMessage {...messages.edit} />
                </Button>
              )}
            </CardExtraContainer>
          }
        >
          {this.isEditModeOn('editEducation') ? (
            <RichTextEditor />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: educationContent,
              }}
            />
          )}
        </Card>
        <br />
        <Card
          hoverable
          type="inner"
          title="Licenses and Certificates"
          extra={
            <CardExtraContainer>
              {this.isEditModeOn('editLicensesAndCertifications') ? (
                <Button
                  onClick={() => {
                    this.setState({ editLicensesAndCertifications: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    this.setState({ editLicensesAndCertifications: true });
                  }}
                >
                  <FormattedHTMLMessage {...messages.edit} />
                </Button>
              )}
            </CardExtraContainer>
          }
        >
          {this.isEditModeOn('editLicensesAndCertifications') ? (
            <RichTextEditor />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: licensesAndCertificationsContent,
              }}
            />
          )}
        </Card>
        <br />
        <Card hoverable type="inner" title="Upload Resume">
          <FileUpload />
        </Card>
      </div>
    );
  }
}

export default ProfileForm;
