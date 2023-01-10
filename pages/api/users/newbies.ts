import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const newbies = await prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json(newbies);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
