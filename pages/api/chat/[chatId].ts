import prisma from '../../../prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
  }

  switch (req.method) {
    case 'POST': {
      await prisma.chattingRoom.update({
        where: { id: req.query.chatId as string },
        data: { chat: req.body.data },
      });
      return res.end();
    }
    case 'GET': {
      const chatData = await prisma.chattingRoom.findUnique({
        where: { id: req.query.chatId as string },
        select: { chat: true },
      });
      return res.json(chatData?.chat);
    }
    default:
      break;
  }
};
