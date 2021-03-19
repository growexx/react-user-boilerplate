import Header from '../index';
import { WrappedStoryComponent } from '../../../stories/utils';

export default {
  title: 'Components/Header',
  component: Header,
};

export const HeaderComponent = () => WrappedStoryComponent(Header);

HeaderComponent.storyName = 'Header Of App';
