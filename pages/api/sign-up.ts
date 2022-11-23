import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // const client = await MongoClient.connect(process.env.DB_CONN_STRING);
    // const db = client.db();
    // const usersCollection = db.collection('users');
    // const result = await usersCollection.insertOne({
    //   nickname: '우엉킥',
    //   email: 'wjddndyd2002@naver.com',
    // });
    // console.log(result);
    // client.close();
    // res.status(201).json({ message: '회원가입 완료' });
  }
}
