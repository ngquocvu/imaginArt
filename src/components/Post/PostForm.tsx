import {
  useActions as useGeneratedPhotoActions,
  useStates as useGeneratedPhotoStates,
} from '@/slices/GeneratedPhotoSlice';
import {
  useActions as useUploadPostActions,
  useStates as useUploadPostStates,
} from '@/slices/uploadPostSlice';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../Introduce/Button';
import Input from '../Introduce/Input';

const PostForm = () => {
  const router = useRouter();
  const { resetGeneratedPhotoState } = useGeneratedPhotoActions();
  const { uploadPost, resetUploadPost } = useUploadPostActions();
  const { recentlyUploadedPost } = useUploadPostStates();
  const { generatedPhoto } = useGeneratedPhotoStates();
  const [isPublished, setIsPublished] = useState(false);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    if (recentlyUploadedPost.data) {
      setIsPublished(true);
    }
  }, [recentlyUploadedPost]);

  useEffect(() => {
    return () => {
      resetUploadPost();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = () => {
    if (
      generatedPhoto.data &&
      generatedPhoto.data.img &&
      generatedPhoto.data.prompt
    ) {
      uploadPost({
        photo: `data:image/jpeg;base64,${generatedPhoto.data.img}`,
        prompt: generatedPhoto.data.prompt,
        artist,
      });
    }
  };

  return isPublished ? (
    <div className="w-full bg-opacity-50 bg-gray-800 p-4 flex flex-col gap-5">
      <Input
        value={`${process.env.BASE_URL}/share/${recentlyUploadedPost.data}`}
        rightButtonValue="Copy"
        className="rounded-none"
        onSubmit={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(
            `${process.env.BASE_URL}/share/${recentlyUploadedPost.data}`
          );
        }}
      />
      <div className="flex flex-row gap-2">
        {/* <Button
          value="Copy link"
          variant="default"
          onClick={() => {
            const url = `${process.env.BASE_URL}/share/${recentlyUploadedPost.data}`;
            router.push(
              `https://www.facebook.com/sharer/sharer.php?u=${url}`
            );
          }}
        /> */}
        <Button
          value="Close"
          variant="error"
          onClick={() => {
            resetGeneratedPhotoState();
            resetUploadPost();
          }}
        />
      </div>
    </div>
  ) : (
    <div className="w-full">
      <div className="w-full bg-opacity-50 bg-gray-800 flex flex-col gap-5 py-7 px-7">
        <div className="text-left text-xl md:text-3xl font-bold">
          Make public
          <div className="text-sm md:text-base text-gray-400">
            Create public page to share
          </div>
        </div>
        <Input
          value={artist}
          variant="submit"
          placeholder="Your name"
          pending={recentlyUploadedPost.pending}
          className="rounded-none"
          disabled={recentlyUploadedPost.pending}
          onInputValue={setArtist}
        />
        <div className="flex gap-2">
          <Button
            value="Publish"
            disabled={recentlyUploadedPost.pending}
            onClick={() => handleFormSubmit()}
          />
          <Button
            value="Cancel"
            disabled={recentlyUploadedPost.pending}
            variant="error"
            onClick={() => {
              resetGeneratedPhotoState();
              resetUploadPost();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
