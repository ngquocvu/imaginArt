import Artwork from '@/components/Gallery/Artwork';
import BackgroundBlob from '@/components/Introduce/BackgroundBlob';
import Button from '@/components/Introduce/Button';
import { AxiosReturnedType, PostTypes } from '@/custom-types';
import axios, { AxiosResponse } from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const SharedPost = ({ _id, photo, artist, prompt }: PostTypes) => {
  const router = useRouter();
  return (
    <div className="min-h-screen backdrop-opacity-50 bg-gray-900 overflow-x-hidden">
      <div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-5xl lg:px-8 flex flex-col md:flex-row items-center justify-center gap-10">
        <BackgroundBlob />
        <div className="shrink-0 relative h-[20rem] w-[20rem] md:h-[35rem] md:w-[35rem] bg-gray-800 bg-opacity-50 dark:text-gray-100 rounded-xl overflow-hidden shadow-lg">
          <Artwork src={photo} />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-200 gap-4">
          <p className="text-center text-base md:text-3xl font-serif text-gray-200">
            “{prompt}”
          </p>
          <p className="text-left text-sm md:text-lg font-serif text-gray-400">
            - {artist} -
          </p>
          <Button value="Generate  More" onClick={() => router.push('/')} />
        </div>
      </div>
      <div className="text-gray-200 font-mono text-center w-full text-xs md:text-base absolute bottom-5">
        Credits:{' '}
        <Link
          href="https://github.com/nguyen-quoc-vu"
          className="text-blue-500 underline"
        >
          Vu Nguyen
        </Link>{' '}
        - Powered by OpenAI
      </div>
    </div>
  );
};

type PageParams = {
  id: string;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<PageParams>): Promise<
  GetServerSidePropsResult<PostTypes | null>
> => {
  try {
    const { data }: AxiosResponse<AxiosReturnedType<PostTypes>> =
      await axios.get(`${process.env.BASE_URL}/api/share?id=${params?.id}`);
    const { _id, prompt, photo, artist } = data.data;
    return {
      props: {
        prompt,
        photo,
        artist,
        _id,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
        statusCode: 307,
      },
    };
  }
};
export default SharedPost;
