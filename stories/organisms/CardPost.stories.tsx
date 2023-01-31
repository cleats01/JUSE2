import { ComponentStory } from '@storybook/react';
import CardPost, { ICardPostProps } from './CardPost';

export default {
  title: 'components/organisms/CardPost',
  component: CardPost,
  args: {
    type: '프로젝트',
    place: '온라인',
    title: '같이 프로젝트하실 분 구합니다.',
    techStack: ['react'],
    application: [
      {
        position: '프론트엔드',
        count: 3,
        accept: [],
        pending: [],
        reject: [],
      },
    ],
    bookmark: 0,
    chat: 0,
    isClosed: false,
  },
};

const Template = (args: ICardPostProps) => <CardPost {...args} />;

export const Default: ComponentStory<typeof CardPost> = Template.bind({});

export const Closed: ComponentStory<typeof CardPost> = Template.bind({});
Closed.args = {
  isClosed: true,
};
