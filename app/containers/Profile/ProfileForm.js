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
import { stateToHTML } from 'draft-js-export-html';
import FileUpload from 'components/FileUpload/Loadable';
import { CardExtraContainer } from './StyledProfile';
import { DATA_TEST_IDS, PROFILE_PLACEHOLDER } from './constants';
import { options } from './helper';
import messages from './messages';
import RichTextEditor from '../../components/RichTextEditor';

const ProfileForm = () => {
  const [state, setState] = React.useState({
    aboutContent: EditorState.createEmpty(),
    experienceContent: EditorState.createEmpty(),
    educationContent: EditorState.createEmpty(),
    licensesAndCertificationsContent: EditorState.createEmpty(),
    editAbout: false,
    editExperience: false,
    editEducation: false,
    editLicensesAndCertifications: false,
  });

  const isEditModeOn = value => state[value] === true;

  const isContentEdited = value =>
    value.getCurrentContent().getPlainText('\u0001').length > 0
      ? stateToHTML(value.getCurrentContent(), options)
      : PROFILE_PLACEHOLDER;

  const {
    aboutContent,
    educationContent,
    experienceContent,
    licensesAndCertificationsContent,
  } = state;
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
            {isEditModeOn('editAbout') ? (
              <Button
                data-testid={DATA_TEST_IDS.ABOUT_SAVE}
                onClick={() => {
                  setState({ ...state, editAbout: false });
                }}
              >
                <FormattedHTMLMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.ABOUT_EDIT}
                onClick={() => {
                  setState({ ...state, editAbout: true });
                }}
              >
                <FormattedHTMLMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {isEditModeOn('editAbout') ? (
          <RichTextEditor
            testId={DATA_TEST_IDS.ABOUT_EDITOR}
            value={aboutContent}
            onChange={value => {
              setState({
                ...state,
                aboutContent: value,
              });
            }}
          />
        ) : (
          ReactHtmlParser(`${isContentEdited(aboutContent)}`)
        )}
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Experience"
        extra={
          <CardExtraContainer>
            {isEditModeOn('editExperience') ? (
              <Button
                data-testid={DATA_TEST_IDS.EXPERIENCE_SAVE}
                onClick={() => {
                  setState({ ...state, editExperience: false });
                }}
              >
                <FormattedHTMLMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.EXPERIENCE_EDIT}
                onClick={() => {
                  setState({ ...state, editExperience: true });
                }}
              >
                <FormattedHTMLMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {isEditModeOn('editExperience') ? (
          <RichTextEditor
            value={experienceContent}
            onChange={value => {
              setState({
                ...state,
                experienceContent: value,
              });
            }}
          />
        ) : (
          ReactHtmlParser(`${isContentEdited(experienceContent)}`)
        )}
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Education"
        extra={
          <CardExtraContainer>
            {isEditModeOn('editEducation') ? (
              <Button
                data-testid={DATA_TEST_IDS.EDUCATION_SAVE}
                onClick={() => {
                  setState({ ...state, editEducation: false });
                }}
              >
                <FormattedHTMLMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.EDUCATION_EDIT}
                onClick={() => {
                  setState({ ...state, editEducation: true });
                }}
              >
                <FormattedHTMLMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {isEditModeOn('editEducation') ? (
          <RichTextEditor
            value={educationContent}
            onChange={value => {
              setState({
                ...state,
                educationContent: value,
              });
            }}
          />
        ) : (
          ReactHtmlParser(`${isContentEdited(educationContent)}`)
        )}
      </Card>
      <br />
      <Card
        hoverable
        type="inner"
        title="Licenses and Certificates"
        extra={
          <CardExtraContainer>
            {isEditModeOn('editLicensesAndCertifications') ? (
              <Button
                data-testid={DATA_TEST_IDS.LICENSEANDCERTIFICATION_SAVE}
                onClick={() => {
                  setState({ ...state, editLicensesAndCertifications: false });
                }}
              >
                <FormattedHTMLMessage {...messages.save} />
              </Button>
            ) : (
              <Button
                data-testid={DATA_TEST_IDS.LICENSEANDCERTIFICATION_EDIT}
                onClick={() => {
                  setState({ ...state, editLicensesAndCertifications: true });
                }}
              >
                <FormattedHTMLMessage {...messages.edit} />
              </Button>
            )}
          </CardExtraContainer>
        }
      >
        {isEditModeOn('editLicensesAndCertifications') ? (
          <RichTextEditor
            value={licensesAndCertificationsContent}
            onChange={value => {
              setState({
                ...state,
                licensesAndCertificationsContent: value,
              });
            }}
          />
        ) : (
          ReactHtmlParser(
            `${isContentEdited(licensesAndCertificationsContent)}`,
          )
        )}
      </Card>
      <br />
      <Card hoverable type="inner" title="Upload Resume">
        <FileUpload />
      </Card>
    </div>
  );
};

export default ProfileForm;
