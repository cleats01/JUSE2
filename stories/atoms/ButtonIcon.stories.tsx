import ButtonIcon, { IButtonIconProps } from './ButtonIcon';
import { ComponentStory } from '@storybook/react';
import DeleteIcon from '@mui/icons-material/Delete';

export default {
  title: 'components/atoms/ButtonIcon',
  component: ButtonIcon,
};

const Template = (args: IButtonIconProps) => (
  <ButtonIcon {...args}>
    <DeleteIcon fontSize='inherit' />
  </ButtonIcon>
);

export const Default: ComponentStory<typeof ButtonIcon> = Template.bind({});
