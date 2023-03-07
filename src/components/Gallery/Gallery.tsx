import React from 'react';
import Image from 'next/image';
import Artwork from './Artwork';
type Props = {};

const Gallery = (props: Props) => {
  return (
    <div id="gallery" className="min-h-screen snap-start ">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col gap-10">
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6x text-center dark:text-gray-100">
          Community Gallery
        </div>
        <div className="grid grid-cols-1 place-items-center gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ArtWorkWrapper src={'/home-img-1.avif'} />
          <ArtWorkWrapper src={'/home-img-2.avif'} />
          <ArtWorkWrapper src={'/home-img-3.avif'} />
          <ArtWorkWrapper src={'/home-img-4.avif'} />
        </div>
      </div>
    </div>
  );
};

export const ArtWorkWrapper = ({ src }: { src: string }) => (
  <div className="h-72 w-72 relative">
    <Artwork src={src} />
  </div>
);

export default Gallery;
