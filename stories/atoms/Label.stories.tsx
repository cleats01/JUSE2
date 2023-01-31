import Label, { ILabelProps } from '@atoms/Label';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/atoms/Label',
  component: Label,
};

const Template = (args: ILabelProps) => <Label {...args} />;

export const Default: ComponentStory<typeof Label> = Template.bind({});
Default.args = {
  children: '레이블',
};
