import axios, { AxiosResponse } from 'axios';
import { AxiosReturnedType, PostTypes } from '@/custom-types';

export const uploadPost = async (props: Omit<PostTypes, '_id'>) => {
  try {
    const { data }: AxiosResponse<AxiosReturnedType<PostTypes>> =
      await axios.post('/api/post', props);
    return data;
  } catch (e) {
    throw new Error('Getting error when uploading post');
  }
};

export const fetchPosts = async () => {
  try {
    const { data }: AxiosResponse<AxiosReturnedType<PostTypes[]>> =
      await axios.get('/api/post');
    return data;
  } catch (e) {
    throw new Error('Getting error while fetching posts');
  }
};
