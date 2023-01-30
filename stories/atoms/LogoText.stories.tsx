import { ComponentStory } from '@storybook/react';
import LogoText, { ILogoProps } from './LogoText';

export default {
  title: 'components/atoms/LogoText',
  component: LogoText,
};

const Template = (args: ILogoProps) => <LogoText {...args} />;

export const Default: ComponentStory<typeof LogoText> = Template.bind({});
