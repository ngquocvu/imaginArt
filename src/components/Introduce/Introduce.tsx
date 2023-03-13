import { useActions } from '@/slices/GeneratedPhotoSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { surpriseMePrompts } from '../../constants/prompts';
import BackgroundBlob from './BackgroundBlob';
import Button from './Button';
import Input from './Input';
import { LOCALES } from '@/constants';

const Introduce = () => {
  const router = useRouter();
  const { fetchGeneratedPhoto } = useActions();
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation('');

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
      className={`snap-start flex flex-col justify-center items-center backdrop-opacity-60 relative`}
    >
      <div className="w-full py-16 px-4 sm:py-24 sm:px-6 flex flex-col items-center justify-around min-h-screen overflow-x-hidden">
        <BackgroundBlob />
        <div>
          <div className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6x text-center backdrop-blur-2xl px-8 py-3 shadow text-gray-50 text-opacity-70 rounded-full">
            ImaginArt
          </div>
          <div className="mb-4 text-lg md:text-xl font-bold text-gray-400 text-center dark:text-gray-400">
            {t('home.home-description')}
          </div>
        </div>
        <div className="flex gap-10 flex-col w-full justify-center items-center mt-4 md:w-2/3">
          <Input
            rightButtonValue={t('home.draw') as string}
            placeholder={t('home.placeholder') as string}
            value={inputValue}
            onInputValue={setInputValue}
            onSubmit={(e) => handleOnSubmit(e)}
          />
          <div className="flex gap-2 md:gap-5 flex-col md:flex-row md:w-2/3 w-full">
            <Button
              onClick={handleSurpriseMeBtn}
              value={t('home.surprise-me')}
            />
            <Button
              onClick={() => router.push('#gallery')}
              value={t('home.community-gallery')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center">
          <p className="text-gray-400 font-semibold text-center text-xs md:text-base">
            {t('home.credits') + ': '}
            <Link
              href="https://github.com/nguyen-quoc-vu"
              className="text-blue-500 underline"
            >
              Vu Nguyen
            </Link>
            {` - ${t('home.powered-by')} OpenAI`}
          </p>
          <p className="font-light text-gray-400 flex gap-2">
            <Link href={'/'} locale={LOCALES.VI}>
              Tiếng Việt
            </Link>
            |
            <Link href={'/'} locale={LOCALES.EN}>
              English
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Introduce;
