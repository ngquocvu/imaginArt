import { HttpMethods } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../../mongodb/models/post';
import mongoConnect from '../../mongodb/connect';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case HttpMethods.POST: {
      try {
        mongoConnect(process.env.MONGODB_URL);
        const { artist, photo, prompt } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
          artist,
          prompt,
          photo: photoUrl.url,
        });
        res.status(200).json({ success: true, data: newPost });
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Unable to create a post, please try again',
        });
      }
      return;
    }
    case HttpMethods.GET: {
      try {
        mongoConnect(process.env.MONGODB_URL);
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Fetching posts failed, please try again',
        });
      }
      return;
    }
    default: {
      res.status(405).json({ success: false, error: 'Method is not allowed' });
    }
  }
};
export default PostHandler;
