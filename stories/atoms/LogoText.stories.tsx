import { ComponentStory } from '@storybook/react';
import LogoText, { ILogoProps } from './LogoText';

export default {
  title: 'components/atoms/LogoText',
  component: LogoText,
  argTypes: { size: { type: 'number', defaultValue: 24 } },
};

const Template = (args: ILogoProps) => <LogoText {...args} />;

export const Default: ComponentStory<typeof LogoText> = Template.bind({});
