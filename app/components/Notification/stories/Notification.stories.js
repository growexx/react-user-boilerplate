import Notification from '../index';
import { WrappedStoryComponent } from '../../../stories/utils';

export default {
  title: 'Components/Notification',
  component: Notification,
};

export const NotificationComponent = () => WrappedStoryComponent(Notification);

NotificationComponent.storyName = 'Notifications';
