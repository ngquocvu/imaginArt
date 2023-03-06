import { useAppDispatch } from '@/hooks/useRedux';
import { useActions } from '@/slices/GeneratedPhotoSlice';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

const Introduce = () => {
  const router = useRouter();
  const { fetchGeneratedPhoto } = useActions();
  const [inputValue, setInputValue] = useState('');
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGeneratedPhoto(inputValue);
    router.push('/post');
  };
  return (
    <div
      id="introduce"
      className={`min-h-screen snap-start flex-col justify-center flex`}
    >
      <div className="max-w-2xl w-full mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:min-w-5xl lg:max-w-7xl lg:px-8 flex flex-col items-center justify-center">
        <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6x text-center dark:text-gray-100">
          InstAI.jpg
        </div>
        <div className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-400 md:text-xl text-center dark:text-gray-400">
          Free online AI image generator from text
        </div>
        <div className="flex gap-10 flex-col w-full justify-center items-center mt-4 max-w-5xl">
          <Input
            value={inputValue}
            onInputValue={setInputValue}
            onSubmit={(e) => handleOnSubmit(e)}
          />
          <Button onClick={() => router.push('#gallery')} />
        </div>
      </div>
    </div>
  );
};

export default Introduce;
