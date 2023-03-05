import { combineClassName } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';

const Artwork = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <a href="#" className="group">
      <div className="rounded-lg bg-gray-200">
        <Image
          alt=""
          width={1024}
          height={1024}
          src="/sample_dalle_pic.png"
          className={combineClassName(
            'group-hover:opacity-75 object-cover',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">Vu Nguyen</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">@vunguyen</p>
    </a>
  );
};

export default Artwork;
