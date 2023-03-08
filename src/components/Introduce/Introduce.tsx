import { useAppDispatch } from '@/hooks/useRedux';
import { useActions } from '@/slices/GeneratedPhotoSlice';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { surpriseMePrompts } from '../../constants/prompts';
import BackgroundBlob from './BackgroundBlob';
import Button from './Button';
import Input from './Input';

const Introduce = () => {
  const router = useRouter();
  const { fetchGeneratedPhoto } = useActions();
  const [inputValue, setInputValue] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGeneratedPhoto(inputValue);
    router.push({ pathname: '/post', query: { search: inputValue } });
  };

  const handleSurpriseMeBtn = () => {
    const index = Math.floor(Math.random() * surpriseMePrompts.length);
    setInputValue(surpriseMePrompts[index]);
  };

  return (
    <div
      id="introduce"
      className={`min-h-screen snap-start flex-col flex backdrop-opacity-60 w-screen`}
    >
      <div className="max-w-2xl w-full mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:min-w-5xl lg:max-w-7xl lg:px-8 flex flex-col items-center justify-around min-h-screen overflow-x-hidden">
        <BackgroundBlob />
        <div>
          <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6x text-center dark:text-gray-100">
            Artwork Generator
          </div>
          <div className="mb-4 text-lg md:text-xl font-bold leading-none tracking-tight text-gray-400 text-center dark:text-gray-400">
            Free online AI picture generator from text
          </div>
        </div>
        <div className="flex gap-10 flex-col w-full justify-center items-center mt-4 max-w-5xl">
          <Input
            rightButtonValue="Draw"
            placeholder={
              'An oil pastel drawing of an annoyed cat in a spaceship...'
            }
            value={inputValue}
            onInputValue={setInputValue}
            onSubmit={(e) => handleOnSubmit(e)}
          />
          <div className="flex gap-2 md:gap-5 flex-col md:flex-row md:w-2/3 w-full">
            <Button onClick={handleSurpriseMeBtn} value={'Surprise me'} />
            <Button
              onClick={() => router.push('#gallery')}
              value={'Community gallery'}
            />
          </div>
        </div>
        <div className="text-gray-200 font-mono text-center text-xs md:text-base">
          Credits: Vu Nguyen - Powered by OpenAI
        </div>
      </div>
    </div>
  );
};
export default Introduce;
