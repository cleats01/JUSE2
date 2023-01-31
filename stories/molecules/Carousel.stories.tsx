import { ComponentStory } from '@storybook/react';
import Image from 'next/image';
import Carousel, { ICarouselProps } from './Carousel';

export default {
  title: 'components/molecules/Carousel',
  component: Carousel,
  args: {
    slides: [
      <Image src={'/slide1.png'} alt={'slide1'} fill priority />,
      <Image
        style={{ cursor: 'pointer' }}
        src={'/slide2.png'}
        alt={'slide2'}
        fill
        priority
      />,
    ],
  },
};

const Template = (args: ICarouselProps) => <Carousel {...args} />;

export const Default: ComponentStory<typeof Carousel> = Template.bind({});
