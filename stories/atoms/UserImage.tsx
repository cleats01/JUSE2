import Image from 'next/image';
import styled from 'styled-components';

export interface IUserImageProps {
  size: number;
  imgSrc: string;
}

export default function UserImage({ size, imgSrc }: IUserImageProps) {
  return (
    <UserImgWrapper size={size}>
      <Image
        src={imgSrc}
        alt='user-image'
        width={size}
        height={size}
        sizes={`${size}px`}
        priority
      />
    </UserImgWrapper>
  );
}

const UserImgWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border: 1px solid #fff;
  border-radius: 999px;
  overflow: hidden;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
  }
`;
