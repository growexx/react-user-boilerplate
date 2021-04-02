/*
 * UnauthorizedPage Messages
 *
 * This contains all the text for the UnauthorizedPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.UnauthorizedPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sorry, you are not authorized to access this page.',
  },
});
