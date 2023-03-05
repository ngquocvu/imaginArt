import { combineClassName } from '@/utils';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  img: string;
};

const ArtworkForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
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
    </div>
  );
};

export default ArtworkForm;
