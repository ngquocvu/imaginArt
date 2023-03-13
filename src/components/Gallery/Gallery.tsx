import React, { useEffect } from 'react';
import Artwork from './Artwork';
import {
  useStates as usePostStates,
  useActions as usePostActions,
} from '@/slices/PostSlice';
import { PostTypes } from '@/custom-types';
import { useTranslation } from 'next-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const { posts } = usePostStates();
  const { fetchAllPosts } = usePostActions();
  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="gallery" className="min-h-screen snap-start">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col gap-10">
        <div className="text-xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-6x text-center">
          {t('home.community-gallery')}
        </div>
        <div className="text-xl font-extrabold leading-none tracking-tight text-gray-300">
          {t('home.newest-post')}
        </div>
        <div className="grid grid-cols-1 place-items-center gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 l:gap-x-5 xl:gap-x-8">
          {posts.data.map((post: PostTypes, index) => {
            return (
              <div
                key={index}
                className="xl:first:col-span-2 xl:first:row-span-2 xl:first:h-full xl:first:w-full h-[16rem] w-[16rem] relative overflow-hidden rounded-lg"
              >
                <ArtWorkWrapper
                  src={post.photo}
                  prompt={post.prompt}
                  artist={post.artist}
                  id={post._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ArtWorkWrapper = ({
  src,
  prompt,
  artist,
  id,
}: {
  src: string;
  prompt: string;
  artist?: string;
  id?: string;
}) => <Artwork src={src} prompt={prompt} artist={artist} id={id} />;

export default Gallery;
