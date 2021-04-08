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
import ReactHtmlParser from 'react-html-parser';
import { Helmet } from 'react-helmet';
import { Card, Button } from 'antd';
import { convertToHTML } from 'draft-convert';
import FileUpload from 'components/FileUpload/Loadable';
import { CardExtraContainer } from './StyledProfile';
import { DATA_TEST_IDS, PROFILE_PLACEHOLDER } from './constants';
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
      ? convertToHTML(state.getCurrentContent())
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
        <p className="u-mb-1">
          <FormattedHTMLMessage {...messages.name} />
        </p>
        <p className="u-mb-1">
          <FormattedHTMLMessage {...messages.designation} />
        </p>
        <p className="u-mb-5">
          <FormattedHTMLMessage {...messages.location} />
        </p>
        <Card
          hoverable
          type="inner"
          title="About"
          extra={
            <CardExtraContainer>
              {this.isEditModeOn('editAbout') ? (
                <Button
                  data-testid={DATA_TEST_IDS.ABOUT_SAVE}
                  onClick={() => {
                    this.setState({ editAbout: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  data-testid={DATA_TEST_IDS.ABOUT_EDIT}
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
              testId={DATA_TEST_IDS.ABOUT_EDITOR}
              value={aboutContent}
              onChange={value => {
                this.setState({
                  aboutContent: value,
                });
              }}
            />
          ) : (
            ReactHtmlParser(`${this.isContentEdited(aboutContent)}`)
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
                  data-testid={DATA_TEST_IDS.EXPERIENCE_SAVE}
                  onClick={() => {
                    this.setState({ editExperience: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  data-testid={DATA_TEST_IDS.EXPERIENCE_EDIT}
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
            ReactHtmlParser(`${this.isContentEdited(experienceContent)}`)
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
                  data-testid={DATA_TEST_IDS.EDUCATION_SAVE}
                  onClick={() => {
                    this.setState({ editEducation: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  data-testid={DATA_TEST_IDS.EDUCATION_EDIT}
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
            ReactHtmlParser(`${this.isContentEdited(educationContent)}`)
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
                  data-testid={DATA_TEST_IDS.LICENSEANDCERTIFICATION_SAVE}
                  onClick={() => {
                    this.setState({ editLicensesAndCertifications: false });
                  }}
                >
                  <FormattedHTMLMessage {...messages.save} />
                </Button>
              ) : (
                <Button
                  data-testid={DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT}
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
            ReactHtmlParser(
              `${this.isContentEdited(licensesAndCertificationsContent)}`,
            )
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
