import CardUser, { ICardUserProps } from '@organisms/CardUser';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/organisms/CardUser',
  component: CardUser,
  args: {
    image: '/user-default.png',
    nickname: '닉네임',
    like: 0,
    userTechStack: ['react', 'typescript', 'javascript', 'aws'],
  },
};

const Template = (args: ICardUserProps) => <CardUser {...args} />;

export const Default: ComponentStory<typeof CardUser> = Template.bind({});
