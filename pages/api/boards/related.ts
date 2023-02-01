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
        const related = await prisma.board.findMany({
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
          select: {
            id: true,
            type: true,
            place: true,
            title: true,
            techStack: true,
            application: true,
            chat: true,
            bookmark: true,
            isClosed: true,
            createdAt: true,
          },
        });

        if (related.length < 4) {
          const additionalRelated = await prisma.board.findMany({
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
            select: {
              id: true,
              type: true,
              place: true,
              title: true,
              techStack: true,
              application: true,
              chat: true,
              bookmark: true,
              isClosed: true,
              createdAt: true,
            },
          });
          related.push(...additionalRelated);
        }

        if (related.length < 4) {
          const additionalRelated = await prisma.board.findMany({
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
            select: {
              id: true,
              type: true,
              place: true,
              title: true,
              techStack: true,
              application: true,
              chat: true,
              bookmark: true,
              isClosed: true,
              createdAt: true,
            },
          });
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
