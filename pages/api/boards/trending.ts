import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createBoard } from '../../../prisma/board';
import prisma from '../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const boards = await prisma.board
          .findMany({
            take: 10,
            orderBy: [
              { bookmark: 'desc' },
              { chat: 'desc' },
              { updatedAt: 'desc' },
            ],
          })
          .then((data) =>
            data.map((board) => ({
              id: board.id,
              type: board.type,
              place: board.place,
              title: board.title,
              techStack: board.techStack,
              application: board.application,
              chat: board.chat,
              bookmark: board.bookmark,
              isClosed: board.isClosed,
            }))
          );
        return res.json(boards);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
