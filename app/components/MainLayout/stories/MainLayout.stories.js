import MainLayout from '../index';
import { WrappedStoryComponent } from '../../../stories/utils';

export default {
  title: 'Components/MainLayout',
  component: MainLayout,
};

export const MainLayoutComponent = () => WrappedStoryComponent(MainLayout);

MainLayoutComponent.storyName = 'Base Layout Of App';
