import { NextApiRequest, NextApiResponse } from 'next';
import { createBoard } from '../../prisma/board';
import prisma from '../../prisma/prisma';

export default async function handler(
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
        const { id } = req.query;
        const isFirstPage = !id;
        const pageCondition = {
          skip: 1,
          cursor: {
            id: id as string,
          },
        };

        const boards = await prisma.board
          .findMany({ take: 5, ...(!isFirstPage && pageCondition) })
          .then((data) =>
            data.map((board) => ({
              id: board.id,
              type: board.type,
              place: board.place,
              title: board.title,
              techStack: board.techStack,
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
