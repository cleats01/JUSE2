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
      case 'PUT': {
        const { id, ...updateData } = req.body;
        const user = await updateUser(id, updateData);
        return res.json(user);
      }
      case 'DELETE': {
        const { id } = req.body;
        const user = await deleteUser(id);
        return res.json(user);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
