import React from 'react';
import Image from 'next/image';
import Artwork from './Artwork';
type Props = {};

const Gallery = (props: Props) => {
  return (
    <div id="gallery" className="min-h-screen snap-start ">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <Artwork />
          <Artwork />
          <Artwork />
          <Artwork />
          <Artwork />
          <Artwork />
          <Artwork />
          <Artwork />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
