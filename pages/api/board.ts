import { NextApiRequest, NextApiResponse } from 'next';
import { createBoard } from '../../prisma/board';

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
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
