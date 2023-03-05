import { useAppSelector } from '@/hooks/useRedux';
import { useStates } from '@/slices/GeneratedPhotoSlice';
import React from 'react';

type Props = {};

const Post = (props: Props) => {
  const { generatedPhoto } = useStates();

  return generatedPhoto.pending ? (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
          style={{ width: '50%' }}
        ></div>
      </div>
    </div>
  ) : (
    <div
      id="post"
      className="min-h-screen snap-center bg-gray-50 text-gray-900"
    ></div>
  );
};

export default Post;
