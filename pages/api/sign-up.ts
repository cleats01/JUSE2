import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await (await clientPromise)
      .db()
      .collection('profiles')
      .insertOne({ email: req.body.email, nickname: req.body.nickname });

    res.status(201).json({ message: '회원가입 완료' });
  }
}
