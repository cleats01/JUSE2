import { NextApiRequest, NextApiResponse } from 'next';
import { createBoard } from '../../prisma/board';
import prisma from '../../prisma/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const board = await createBoard(req.body);
        return res.json(board);
      }
      case 'GET': {
        const boards = await prisma.board.findMany({ take: 1 });
        return res.json(boards);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
