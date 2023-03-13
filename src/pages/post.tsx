import BackgroundBlob from '@/components/Introduce/BackgroundBlob';
import Input from '@/components/Introduce/Input';
import GeneratedPhotoSection from '@/components/Post/GeneratedPhoto';
import PostForm from '@/components/Post/PostForm';
import {
  useActions as useGeneratedPhotoActions,
  useStates,
} from '@/slices/GeneratedPhotoSlice';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Post = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { generatedPhoto } = useStates();
  const { fetchGeneratedPhoto } = useGeneratedPhotoActions();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const { search } = router.query;
    setInputValue(search ? String(search) : '');
  }, [router]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGeneratedPhoto(inputValue);
  };

  return (
    <>
      <Head>
        <title>ImaginArt | Post </title>
      </Head>
      <div className="min-h-screen relative backdrop-opacity-50 bg-gray-900 overflow-x-hidden">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-2xl lg:px-8 flex justify-center">
          <div className="flex gap-5 flex-col w-full justify-center items-center mt-4 max-w-5xl text-gray-300">
            <BackgroundBlob />
            <Input
              value={inputValue}
              onInputValue={(value) => setInputValue(value)}
              onSubmit={(e) => handleOnSubmit(e)}
              disabled={generatedPhoto.pending}
              pending={generatedPhoto.pending}
              rightButtonValue={t('home.draw') as string}
              placeholder={t('home.placeholder') as string}
            />
            <GeneratedPhotoSection /> {generatedPhoto.data && <PostForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
export default Post;
