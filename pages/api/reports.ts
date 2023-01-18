import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await prisma.report.create({ data: req.body });
    return res.end();
  }
}
