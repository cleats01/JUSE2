import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const boards = await prisma.board.findMany({
          take: 10,
          orderBy: [
            { bookmark: 'desc' },
            { chat: 'desc' },
            { updatedAt: 'desc' },
          ],
          select: {
            id: true,
            type: true,
            place: true,
            title: true,
            techStack: true,
            application: true,
            chat: true,
            bookmark: true,
            isClosed: true,
            createdAt: true,
          },
        });
        return res.json(boards);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
