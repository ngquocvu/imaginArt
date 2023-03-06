import React from 'react';
import Image from 'next/image';
import Artwork from './Artwork';
type Props = {};

const Gallery = (props: Props) => {
  return (
    <div id="gallery" className="min-h-screen snap-start ">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
  <div className="h-[18rem] w-[18rem] relative">
    <Artwork src={src} />
  </div>
);

export default Gallery;
