import { NextApiRequest, NextApiResponse } from 'next';
import { createBoard } from '../../prisma/board';
import prisma from '../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST': {
        const board = await createBoard(req.body);
        return res.json(board);
      }
      case 'GET': {
        const { id, type, place, period, techStack, search } = req.query;
        const isFirstPage = !id;
        const pageCondition = {
          skip: 1,
          cursor: {
            id: id as string,
          },
        };

        const periodGeneretor = (period: string): string[] => {
          const range = period.split(',').map((month) => +month);
          const allPeriods = [];
          for (let i = range[0]; i <= range[1]; i++) {
            if (i === 1) {
              allPeriods.push('1개월 이하');
            } else if (i === 6) {
              allPeriods.push('6개월 이상');
            }
            allPeriods.push(`${i}개월`);
          }
          return allPeriods;
        };

        const filterOption = {
          type: type ? (type as string) : undefined,
          place: place ? (place as string) : undefined,
          period: period
            ? {
                in: periodGeneretor(period as string),
              }
            : undefined,
          techStack: techStack
            ? (techStack as string).split(',').length === 1
              ? { has: techStack as string }
              : {
                  hasEvery: (techStack as string).split(','),
                }
            : undefined,
          title: { contains: search as string },
        };

        const boards = await prisma.board
          .findMany({
            take: search ? 20 : 5,
            where: filterOption,
            ...(!isFirstPage && pageCondition),
            orderBy: { updatedAt: 'desc' },
          })
          .then((data) =>
            data.map((board) => ({
              id: board.id,
              type: board.type,
              place: board.place,
              title: board.title,
              techStack: board.techStack,
              position: board.position,
              chat: board.chat,
              bookmark: board.bookmark,
            }))
          );
        return res.json(boards);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
