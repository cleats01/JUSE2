import { boardFormData } from '../components/NavbarNew';
import prisma from './prisma';

// CREATE
export const createBoard = async (data: boardFormData) => {
  const board = await prisma.board.create({
    data,
  });
  return board;
};
