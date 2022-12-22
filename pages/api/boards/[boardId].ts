import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma';
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

  const { boardId, isClosed } = req.query;

  try {
    switch (req.method) {
      case 'GET': {
        const boardData = await prisma.board.findUnique({
          where: { id: boardId as string },
          include: { author: true },
        });
        return res.json({
          ...boardData,
          isBookmarked:
            user && boardData
              ? user.bookmarkList.includes(boardData.id)
              : false,
        });
      }
      case 'PATCH': {
        if (isClosed !== undefined) {
          await prisma.board.update({
            where: { id: boardId as string },
            data: { isClosed: isClosed === 'true' ? true : false },
          });
          return res.status(200).json({ message: 'Success' });
        }
      }
      case 'DELETE': {
        await prisma.board.delete({ where: { id: boardId as string } });
        return res.status(200).json({ message: 'Deleted' });
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
