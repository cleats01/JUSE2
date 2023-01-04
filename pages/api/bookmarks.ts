import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
  }

  try {
    switch (req.method) {
      case 'POST': {
        if (user?.bookmarkList.includes(req.query.boardId as string)) {
          // 이미 북마크가 되어있는 경우
          const removedList = user.bookmarkList.filter(
            (id) => id !== req.query.boardId
          );
          await prisma.user.update({
            where: { id: user?.id as string },
            data: { bookmarkList: removedList },
          });
          await prisma.board.update({
            where: { id: req.query.boardId as string },
            data: { bookmark: { decrement: 1 } },
          });
        } else {
          // 북마크가 되어있지 않은 경우
          await prisma.user.update({
            where: { id: user?.id as string },
            data: { bookmarkList: { push: req.query.boardId } },
          });
          await prisma.board.update({
            where: { id: req.query.boardId as string },
            data: { bookmark: { increment: 1 } },
          });
        }
        return res.status(200).json({ message: 'bookmarked' });
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
