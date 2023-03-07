import { HttpMethods } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const generatePhotoHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const method = req.method;
  switch (method) {
    case HttpMethods.POST: {
      try {
        const { prompt } = req.body;
        if (!prompt) {
          res
            .status(401)
            .json({ error: 'prompt is missing from the request body.' });
          return;
        }
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const aiResponse = await openai.createImage({
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).send({ success: true, img: image, prompt: prompt });
      } catch (e) {
        res.status(500).json({ error: e });
      }
      return;
    }
    default: {
      res.status(405).json({ success: false, error: 'Method is not allowed' });
    }
  }
};

export default generatePhotoHandler;
