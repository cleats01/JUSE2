import { Board } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const boardId: string = req.query.boardId as string;

  const originalBoard: Board | null = await prisma.board.findUnique({
    where: { id: boardId },
  });

  try {
    switch (req.method) {
      case 'GET': {
        const related = await prisma.board
          .findMany({
            where: {
              OR: [{ techStack: { hasSome: originalBoard?.techStack } }],
              NOT: { id: boardId },
            },
            orderBy: [
              { bookmark: 'desc' },
              { chat: 'desc' },
              {
                createdAt: 'desc',
              },
            ],
            take: 4,
          })
          .then((data) =>
            data.map((board) => ({
              id: board.id,
              type: board.type,
              place: board.place,
              title: board.title,
              techStack: board.techStack,
              application: board.application,
              chat: board.chat,
              bookmark: board.bookmark,
              isClosed: board.isClosed,
            }))
          );

        if (related.length < 4) {
          const additionalRelated = await prisma.board
            .findMany({
              where: {
                OR: [
                  { type: originalBoard?.type },
                  { place: originalBoard?.place },
                ],
                NOT: [
                  { id: boardId },
                  { id: { in: related.map((board: boardData) => board.id) } },
                ],
              },
              orderBy: [
                { bookmark: 'desc' },
                { chat: 'desc' },
                {
                  createdAt: 'desc',
                },
              ],
              take: 4 - related.length,
            })
            .then((data) =>
              data.map((board) => ({
                id: board.id,
                type: board.type,
                place: board.place,
                title: board.title,
                techStack: board.techStack,
                application: board.application,
                chat: board.chat,
                bookmark: board.bookmark,
                isClosed: board.isClosed,
              }))
            );
          related.push(...additionalRelated);
        }

        if (related.length < 5) {
          const additionalRelated = await prisma.board
            .findMany({
              where: {
                NOT: [
                  { id: boardId },
                  { id: { in: related.map((board: boardData) => board.id) } },
                ],
              },
              orderBy: [
                { bookmark: 'desc' },
                { chat: 'desc' },
                {
                  createdAt: 'desc',
                },
              ],
              take: 4 - related.length,
            })
            .then((data) =>
              data.map((board) => ({
                id: board.id,
                type: board.type,
                place: board.place,
                title: board.title,
                techStack: board.techStack,
                application: board.application,
                chat: board.chat,
                bookmark: board.bookmark,
                isClosed: board.isClosed,
              }))
            );
          related.push(...additionalRelated);
        }

        return res.json(related);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
