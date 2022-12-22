import { NextApiRequest, NextApiResponse } from 'next';
import { getSignedFileUrl } from '../../lib/s3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, type }: { name: string; type: string } = req.body;
      const fileParams = {
        name,
        type,
      };
      const signedUrl = await getSignedFileUrl(fileParams);
      console.log(signedUrl);
      return res.status(201).json({
        message: 'make url succeed',
        url: signedUrl,
      });
    } catch (e) {
      return res.status(500).json({
        message: 'make url failed',
      });
    }
  }
}
