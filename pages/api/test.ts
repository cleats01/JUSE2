import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        return res.status(200).json({ message: '성공' });
      }
      default: {
        break;
      }
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error!!' });
  }
}
