import FontAwesomeDemo from '../index';
import { WrappedStoryComponent } from '../../../stories/utils';

export default {
  title: 'Components/FontAwesomeDemo',
  component: FontAwesomeDemo,
};

export const FontAwesomeDemoComponent = () =>
  WrappedStoryComponent(FontAwesomeDemo);

FontAwesomeDemoComponent.storyName = 'Font Awesome Icons';
