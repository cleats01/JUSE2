import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  let user: null | User = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const myList = await prisma.board
          .findMany()
          .then((data) => data.filter((board) => board.authorId === user?.id));
        const applyList = await prisma.board.findMany({
          where: { id: { in: user?.applyList } },
        });
        const bookmarkList = await prisma.board.findMany({
          where: { id: { in: user?.bookmarkList } },
        });
        const acceptedList = await prisma.board.findMany({
          where: { id: { in: user?.acceptedList } },
        });
        return res.json({ myList, applyList, bookmarkList, acceptedList });
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
