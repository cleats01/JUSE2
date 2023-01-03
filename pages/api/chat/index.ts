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
    // 채팅방 리스트 불러오기
    case 'GET': {
      let chatListData;
      if (req.query.userId) {
        const user = await prisma.user.findUnique({
          where: { id: req.query.userId as string },
        });
        chatListData = await prisma.room.findMany({
          where: { id: { in: user?.chatList } },
        });
      }
      if (req.query.boardId) {
        chatListData = await prisma.room.findMany({
          where: { boardId: { has: req.query.boardId as string } },
        });
      }
      return res.json(chatListData);
    }
    // 채팅방 만들기
    case 'POST': {
      const { membersId } = req.body;
      let chattingRoom = null;
      if (membersId) {
        // 기존 해당 유저와의 채팅방
        chattingRoom = await prisma.room.findFirst({
          where: { membersId: { hasEvery: membersId } },
        });
        // 기존 채팅방이 없으면 새로 만든다.
        if (!chattingRoom) {
          const membersData = await prisma.user.findMany({
            where: { id: { in: membersId } },
            select: { id: true, nickname: true, image: true },
          });
          chattingRoom = await prisma.room.create({
            data: { membersId, membersData },
          });
          // 유저들 데이터에 채팅방 id 추가
          await prisma.user.updateMany({
            where: { id: { in: membersId } },
            data: { chatList: { push: chattingRoom.id } },
          });
        }
      }
      // 게시물을 통한 채팅은 boardId 주입 및 채팅 수 1 추가
      if (
        chattingRoom &&
        req.query.boardId &&
        !chattingRoom.boardId.includes(req.query.boardId as string)
      ) {
        chattingRoom = await prisma.room.update({
          where: { id: chattingRoom.id },
          data: { boardId: { push: req.query.boardId as string } },
        });
        await prisma.board.update({
          where: { id: req.query.boardId as string },
          data: { chat: { increment: 1 } },
        });
      }
      // 해당 채팅방 데이터 출력
      return res.json(chattingRoom);
    }
    default:
      break;
  }
};
