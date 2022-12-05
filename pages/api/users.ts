import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
} from '../../prisma/user';

export default async function handle(
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
        } else {
          const users = await getAllUsers();
          return res.json(users);
        }
      }
      case 'POST': {
        const { email, nickname, userTechStack } = req.body;
        const user = await createUser(email, nickname, userTechStack);
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
