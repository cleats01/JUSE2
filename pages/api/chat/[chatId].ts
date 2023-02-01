import prisma from '../../../prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { User } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  let user: User | null = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
  }

  switch (req.method) {
    case 'POST': {
      await prisma.room.update({
        where: { id: req.query.chatId as string },
        data: { chat: { push: req.body.data } },
      });
      return res.end();
    }
    case 'GET': {
      const chatData = await prisma.room.findUnique({
        where: { id: req.query.chatId as string },
        select: { chat: true, membersData: true },
      });
      const updateRead = chatData?.chat.map((message) => {
        if (message.userId !== user?.id) {
          return { ...message, isRead: true };
        }
        return message;
      });
      await prisma.room.update({
        where: { id: req.query.chatId as string },
        data: {
          chat: updateRead,
        },
      });
      return res.json(chatData);
    }
    default:
      break;
  }
};
