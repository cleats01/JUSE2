import ButtonFixedPosition, {
  IButtonFixedPositionProps,
} from '@atoms/ButtonFixedPosition';
import { ComponentStory } from '@storybook/react';
import { AngleUpIcon } from 'components/Common/Icons';

export default {
  title: 'components/atoms/ButtonFixedPosition',
  component: ButtonFixedPosition,
};

const Template = (args: IButtonFixedPositionProps) => (
  <ButtonFixedPosition {...args}>
    <AngleUpIcon />
  </ButtonFixedPosition>
);

export const Default: ComponentStory<typeof ButtonFixedPosition> =
  Template.bind({});
Default.args = {
  bottom: 45,
  visible: true,
  size: 35,
};
