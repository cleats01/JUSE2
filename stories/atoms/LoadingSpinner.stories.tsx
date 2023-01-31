import { ComponentStory } from '@storybook/react';
import LoadingSpinner, { ILoadingSpinnerProps } from './LoadingSpinner';

export default {
  title: 'components/atoms/LoadingSpinner',
  component: LoadingSpinner,
};

const Template = (args: ILoadingSpinnerProps) => <LoadingSpinner {...args} />;

export const Default: ComponentStory<typeof LoadingSpinner> = Template.bind({});
