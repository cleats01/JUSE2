import UserImage, { IUserImageProps } from '@atoms/UserImage';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/atoms/UserImage',
  component: UserImage,
  args: {
    size: 50,
    imgSrc: '/user-default.png',
  },
};

const Template = (args: IUserImageProps) => <UserImage {...args} />;

export const Default: ComponentStory<typeof UserImage> = Template.bind({});
