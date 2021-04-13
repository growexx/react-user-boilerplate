/*
 * Profile Messages
 *
 * This contains all the text for the Profile container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Profile';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Profile container!',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'John Doe',
  },
  designation: {
    id: `${scope}.designation`,
    defaultMessage: 'Software Engineer at GrowExx',
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'Ahmedabad, Gujarat',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
});
