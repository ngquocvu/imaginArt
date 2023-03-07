import Artwork from '@/components/Gallery/Artwork';
import BackgroundBlob from '@/components/Introduce/BackgroundBlob';
import Input from '@/components/Introduce/Input';
import { useAppSelector } from '@/hooks/useRedux';
import { useActions, useStates } from '@/slices/GeneratedPhotoSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Post = () => {
  const router = useRouter();
  const { generatedPhoto } = useStates();
  const { fetchGeneratedPhoto } = useActions();
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(0);

  useEffect(() => {
    const { search } = router.query;
    setInputValue(search ? String(search) : '');
  }, [router]);

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
    <>
      <div className=" min-h-screen relative backdrop-opacity-50 bg-gray-900">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-2xl lg:px-8 flex justify-center">
          <div className="flex gap-5 flex-col w-full justify-center items-center mt-4 max-w-5xl">
            <BackgroundBlob />
            <Input
              value={inputValue}
              onInputValue={(value) => setInputValue(value)}
              onSubmit={(e) => handleOnSubmit(e)}
              disabled={generatedPhoto.pending}
              pending={generatedPhoto.pending}
            />
            <div className="h-[20rem] w-[20rem] md:h-[40rem] md:w-[40rem] relative bg-gray-800 bg-opacity-50 dark:text-gray-100 rounded-xl overflow-hidden">
              {generatedPhoto.pending ? (
                <>
                  <div className="w-full h-1 rounded-xl relative animate-loader" />
                  <div className="w-full h-full flex flex-col justify-center items-center font-mono dark:text-gray-500">
                    <p>{time}s</p>
                    <p>Estimated time: 10-20s</p>
                    <p>
                      Tips: Hover the generated photo to see its prompt and
                      download button{' '}
                    </p>
                  </div>
                </>
              ) : !generatedPhoto.pending && generatedPhoto.error ? (
                <div className="w-full h-full flex flex-col justify-center items-center font-mono dark:text-gray-500">
                  <p>{generatedPhoto.error}</p>
                </div>
              ) : generatedPhoto.data &&
                generatedPhoto.data.img &&
                generatedPhoto.data?.prompt ? (
                <Artwork
                  src={`data:image/jpeg;base64,${generatedPhoto.data.img}`}
                  prompt={generatedPhoto.data.prompt}
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center font-mono text-gray-400">
                  <p className="text-center">
                    Enter any prompt in your mind and click draw to generate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
