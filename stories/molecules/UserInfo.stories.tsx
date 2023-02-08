import UserInfo, { IUserInfoProps } from '@molecules/UserInfo';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/molecules/UserInfo',
  component: UserInfo,
  args: {
    image: '/user-default.png',
    nickname: '닉네임',
    like: 0,
    userTechStack: ['react', 'typescript', 'javascript', 'aws'],
  },
};

const Template = (args: IUserInfoProps) => <UserInfo {...args} />;

export const Default: ComponentStory<typeof UserInfo> = Template.bind({});
