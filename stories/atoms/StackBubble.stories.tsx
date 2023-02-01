import StackBubble, { IStackBubbleProps } from '@atoms/StackBubble';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/atoms/StackBubble',
  component: StackBubble,
};

const Template = (args: IStackBubbleProps) => <StackBubble {...args} />;

export const Default: ComponentStory<typeof StackBubble> = Template.bind({});
Default.args = {
  stack: 'react',
};
