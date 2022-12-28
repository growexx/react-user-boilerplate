import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Users';

export default defineMessages({
  imgSizeBig: {
    id: `${scope}.body`,
    defaultMessage: 'Image size must be less than 2MB!',
  },
  uploadText: {
    id: `${scope}.body`,
    defaultMessage: 'Click to Upload',
  },
});
