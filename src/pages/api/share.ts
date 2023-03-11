import { HttpMethods } from '@/utils';
import mongoConnect from '../../mongodb/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../mongodb/models/post';
import { PostTypes } from '@/custom-types';

const ShareHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case HttpMethods.GET: {
      try {
        mongoConnect(process.env.MONGODB_URL);
        const { id } = req.query;
        const post: PostTypes | null = await Post.findById(id);
        res.status(200).json({ success: true, data: post });
      } catch (e) {
        res.status(500).json({
          success: false,
          error: 'Fetching post failed, please try again',
        });
      }
      return;
    }
    default: {
      res.status(405).json({ success: false, error: 'Method is not allowed' });
    }
  }
};
export default ShareHandler;
