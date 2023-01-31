import ButtonText, { IButtonProps } from '@atoms/ButtonText';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/atoms/ButtonText',
  component: ButtonText,
  args: {
    label: 'button',
  },
};

const Template = (args: IButtonProps) => <ButtonText {...args} />;

export const Default: ComponentStory<typeof ButtonText> = Template.bind({});

export const Contained: ComponentStory<typeof ButtonText> = Template.bind({});
Contained.args = {
  variant: 'contained',
};

export const Outlined: ComponentStory<typeof ButtonText> = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};
