import ButtonText, { IButtonProps } from './ButtonText';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/atoms/ButtonText',
  component: ButtonText,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'button',
      description: '버튼에 들어갈 텍스트',
      control: {
        type: 'text',
      },
    },
    variant: {
      type: 'string',
      defaultValue: 'text',
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    disabled: { type: 'boolean', defaultValue: false },
    fullWidth: { type: 'boolean', defaultValue: false },
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
