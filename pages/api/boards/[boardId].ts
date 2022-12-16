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

  try {
    switch (req.method) {
      case 'GET': {
        const { boardId } = req.query;
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
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
