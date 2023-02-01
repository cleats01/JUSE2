import { ComponentStory } from '@storybook/react';
import Chip, { IChipProps } from './Chip';

export default {
  title: 'components/atoms/Chip',
  component: Chip,
  args: {
    children: 'Chip',
    Outlined: false,
    radius: 5,
  },
};

const Template = (args: IChipProps) => <Chip {...args} />;

export const Default: ComponentStory<typeof Chip> = Template.bind({});

export const Outlined: ComponentStory<typeof Chip> = Template.bind({});
Outlined.args = {
  outlined: true,
};

export const Rounded: ComponentStory<typeof Chip> = Template.bind({});
Rounded.args = {
  radius: 99,
};
