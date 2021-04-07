/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * ProfileForm Form
 *
 */

import React from 'react';
import { EditorState } from 'draft-js';
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
      aboutContent: EditorState.createEmpty(),
      experienceContent: EditorState.createEmpty(),
      educationContent: EditorState.createEmpty(),
      licensesAndCertificationsContent: EditorState.createEmpty(),
      editAbout: false,
      editExperience: false,
      editEducation: false,
      editLicensesAndCertifications: false,
    };
  }

  isEditModeOn = state => this.state[state] === true;

  isContentEdited = state =>
    state.getCurrentContent().getPlainText('\u0001').length > 0
      ? state.getCurrentContent().getPlainText('\u0001')
      : PROFILE_PLACEHOLDER;

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
            <RichTextEditor
              value={aboutContent}
              onChange={value => {
                this.setState({
                  aboutContent: value,
                });
              }}
            />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: this.isContentEdited(aboutContent),
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
            <RichTextEditor
              value={experienceContent}
              onChange={value => {
                this.setState({
                  experienceContent: value,
                });
              }}
            />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: this.isContentEdited(experienceContent),
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
            <RichTextEditor
              value={educationContent}
              onChange={value => {
                this.setState({
                  educationContent: value,
                });
              }}
            />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: this.isContentEdited(educationContent),
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
            <RichTextEditor
              value={licensesAndCertificationsContent}
              onChange={value => {
                this.setState({
                  licensesAndCertificationsContent: value,
                });
              }}
            />
          ) : (
            <FormattedHTMLMessage
              {...messages.aboutContent}
              values={{
                content: this.isContentEdited(licensesAndCertificationsContent),
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
