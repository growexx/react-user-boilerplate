/*
 * SampleForm Messages
 *
 * This contains all the text for the SampleForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SampleForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SampleForm container!',
  },
});
