import { ComponentStory } from '@storybook/react';
import FlexWrapper, { IFlexWrapperProps } from './FlexWrapper';

export default {
  title: 'components/atoms/FlexWrapper',
  component: FlexWrapper,
};

const Template = (args: IFlexWrapperProps) => (
  <FlexWrapper {...args}>
    <div>Item1</div>
    <div>Item2</div>
    <div>Item3</div>
  </FlexWrapper>
);

export const Default: ComponentStory<typeof FlexWrapper> = Template.bind({});

export const Column: ComponentStory<typeof FlexWrapper> = Template.bind({});
Column.args = {
  direction: 'column',
};

export const Centered: ComponentStory<typeof FlexWrapper> = Template.bind({});
Centered.args = {
  center: true,
};
