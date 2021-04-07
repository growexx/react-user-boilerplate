/*
 * FileUpload Messages
 *
 * This contains all the text for the FileUpload component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.FileUpload';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FileUpload component!',
  },
  uploadSuccess: {
    id: `${scope}.uploadSuccess`,
    defaultMessage: `{filename} file uploaded successfully.`,
  },
  uploadError: {
    id: `${scope}.uploadError`,
    defaultMessage: `{filename} file upload failed.`,
  },
});
