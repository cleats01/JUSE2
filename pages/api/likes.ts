import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prisma';
import { getSession } from 'next-auth/react';
import { updateUser } from '../../prisma/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  }

  try {
    switch (req.method) {
      case 'GET': {
        let isLiked: boolean = false;
        if (user) {
          isLiked = user.likeList.includes(req.query.userId as string);
        }
        return res.status(200).json({
          isLiked,
        });
      }
      case 'POST': {
        if (user?.likeList.includes(req.query.userId as string)) {
          // 이미 좋아요가 되어있는 경우
          const removedList = user.likeList.filter(
            (id) => id !== req.query.userId
          );
          await prisma.user.update({
            where: { id: user?.id as string },
            data: { likeList: removedList },
          });
          await prisma.user.update({
            where: { id: req.query.userId as string },
            data: { like: { decrement: 1 } },
          });
        } else {
          // 좋아요가 되어있지 않은 경우
          await prisma.user.update({
            where: { id: user?.id as string },
            data: { likeList: { push: req.query.userId } },
          });
          await prisma.user.update({
            where: { id: req.query.userId as string },
            data: { like: { increment: 1 } },
          });
        }
        return res.status(200).json({ message: 'liked' });
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
