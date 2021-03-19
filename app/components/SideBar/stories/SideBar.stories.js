import SideBar from '../index';
import { WrappedStoryComponent } from '../../../stories/utils';

export default {
  title: 'Components/SideBar',
  component: SideBar,
};

const Template = args => WrappedStoryComponent(SideBar, args);

export const Sidebar = Template.bind({});
Sidebar.args = {
  collapsed: true,
};

Sidebar.storyName = 'Side Navigation of the App';
