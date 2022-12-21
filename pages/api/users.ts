import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prisma';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
} from '../../prisma/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        if (req.query.id) {
          const user = await getUserById(req.query.id as string);
          return res.status(200).json(user);
        } else if (req.query.email) {
          const user = await getUserByEmail(req.query.email as string);
          return res.status(200).json(user);
        } else if (req.query.ids) {
          const users = await prisma.user.findMany({
            where: {
              id: {
                in: (req.query.ids as string).split(','),
              },
            },
          });
          return res.status(200).json(users);
        } else {
          const users = await getAllUsers();
          return res.json(users);
        }
      }
      case 'POST': {
        const { email, nickname, userTechStack, image } = req.body;
        const user = await createUser(email, nickname, userTechStack, image);
        return res.json(user);
      }
      case 'PATCH': {
        const { id, nickname, image, userTechStack } = req.body;
        await prisma.user.update({
          where: { id },
          data: { nickname, image, userTechStack },
        });
        return res.status(200).json({ message: 'updated!' });
      }
      case 'DELETE': {
        await prisma.board.deleteMany({
          where: { authorId: req.query.id as string },
        });
        await prisma.user.delete({ where: { id: req.query.id as string } });
        return res.status(200).json({ message: 'deleted!' });
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
