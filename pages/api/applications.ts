import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prisma';
import { getSession } from 'next-auth/react';
import { User, userSimple } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  let user: User | null = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
  } else {
    return res.status(400).json({ message: 'Login Please' });
  }

  const positionCurrent = await prisma.board
    .findUnique({ where: { id: req.query.boardId as string } })
    .then((data) => data?.application);

  try {
    switch (req.method) {
      case 'GET': {
      }
      case 'POST': {
        await prisma.board.update({
          where: { id: req.query.boardId as string },
          data: {
            application: positionCurrent?.map((position) => {
              if (position.position === req.query.position && user) {
                const userSimpleData: userSimple = {
                  id: user.id,
                  nickname: user.nickname,
                  image: user.image,
                };
                position.pending.push(userSimpleData);
              }
              return position;
            }),
          },
        });
        await prisma.user.update({
          where: { id: user?.id },
          data: { applyList: { push: req.query.boardId } },
        });
        return res.status(200).json({ message: 'applied' });
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
