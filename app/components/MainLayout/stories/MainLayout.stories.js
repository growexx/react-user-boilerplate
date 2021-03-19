import React from 'react';
import { WrappedStoryComponent } from '../../../stories/utils';
import MainLayout from '../index';

export default {
  title: 'Components/MainLayout',
  component: MainLayout,
};

export const MainLayoutComponent = () => WrappedStoryComponent(MainLayout);

MainLayoutComponent.storyName = 'Base Layout Of App';
