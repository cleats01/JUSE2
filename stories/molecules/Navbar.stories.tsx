import Navbar, { INavbarProps } from './Navbar';
import { ComponentStory } from '@storybook/react';
import LogoText from '@stories/atoms/LogoText';
import ButtonIcon from '@stories/atoms/ButtonIcon';
import { AngleLeftIcon, DotsVerticalIcon } from '@components/Common/Icons';

export default {
  title: 'components/molecules/Navbar',
  component: Navbar,
};

const Template = (args: INavbarProps) => <Navbar {...args} />;

export const Default: ComponentStory<typeof Navbar> = Template.bind({});
Default.args = {
  centerItem: <LogoText />,
};

export const LeftCenter: ComponentStory<typeof Navbar> = Template.bind({});
LeftCenter.args = {
  leftItem: (
    <ButtonIcon>
      <AngleLeftIcon />
    </ButtonIcon>
  ),
  centerItem: <LogoText />,
};

export const LeftRight: ComponentStory<typeof Navbar> = Template.bind({});
LeftRight.args = {
  leftItem: (
    <ButtonIcon>
      <AngleLeftIcon />
    </ButtonIcon>
  ),
  rightItem: (
    <ButtonIcon>
      <DotsVerticalIcon />
    </ButtonIcon>
  ),
};
