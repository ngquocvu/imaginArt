import Artwork from '@/components/Gallery/Artwork';
import Input from '@/components/Introduce/Input';
import { useAppSelector } from '@/hooks/useRedux';
import { useActions, useStates } from '@/slices/GeneratedPhotoSlice';
import React, { useEffect, useState } from 'react';

const Post = () => {
  const { generatedPhoto } = useStates();
  const { fetchGeneratedPhoto } = useActions();
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(0);
  useEffect(() => {
    let intervalID: ReturnType<typeof setInterval>;
    if (generatedPhoto.pending) {
      intervalID = setInterval(() => setTime((time) => time + 1), 1000);
    }

    return () => {
      if (intervalID) {
        setTime(0);
        clearInterval(intervalID);
      }
    };
  }, [generatedPhoto]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGeneratedPhoto(inputValue);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-2xl lg:px-8 flex justify-center">
        <div className="flex gap-5 flex-col w-full justify-center items-center mt-4 max-w-5xl">
          <Input
            value={inputValue}
            onInputValue={(value) => setInputValue(value)}
            onSubmit={(e) => handleOnSubmit(e)}
            disabled={generatedPhoto.pending}
            pending={generatedPhoto.pending}
          />
          <div className="bg-gray-200 h-[20rem] w-[20rem] md:h-[40rem] md:w-[40rem] relative dark:bg-gray-800 dark:text-gray-100 rounded-xl">
            {generatedPhoto.pending ? (
              <div className="w-full h-full flex flex-col justify-center items-center font-mono dark:text-gray-500">
                <p>{time}s</p>
                <p>Estimated time: 10s</p>
              </div>
            ) : !generatedPhoto.pending && generatedPhoto.error ? (
              <div className="w-full h-full flex flex-col justify-center items-center font-mono dark:text-gray-500">
                <p>{generatedPhoto.error}</p>
              </div>
            ) : generatedPhoto.data ? (
              <Artwork src={`data:image/jpeg;base64,${generatedPhoto.data}`} />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center font-mono dark:text-gray-500">
                <p>Generate new pics</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
