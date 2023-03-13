import { useStates } from '@/slices/GeneratedPhotoSlice';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loader from '../Common/Loader';
import Artwork from '../Gallery/Artwork';

const GeneratedPhotoSection = () => {
  const { generatedPhoto } = useStates();
  const [time, setTime] = useState(0);
  const { t } = useTranslation();

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

  return (
    <div className="h-[20rem] w-[20rem] md:h-[40rem] md:w-[40rem] relative bg-gray-800 font-mono text-xs md:text-lg bg-opacity-50 dark:text-gray-100 rounded-xl overflow-hidden shadow-lg">
      {generatedPhoto.pending ? (
        <div className="flex flex-col gap-5 h-full">
          <Loader />
          <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4 text-xs md:text-sm text-gray-200 p-4">
            <p>{time}s</p>
            <p>{t('generated-photo.estimated-time')}: 10-20s</p>
            <p>{t('generated-photo.tips')}</p>
          </div>
        </div>
      ) : generatedPhoto.error ? (
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-200">
          <p>{generatedPhoto.error}</p>
        </div>
      ) : generatedPhoto.data ? (
        <>
          <Artwork
            src={`data:image/jpeg;base64,${generatedPhoto.data.img}`}
            prompt={generatedPhoto.data.prompt}
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-200 p-4 gap-6">
          <p className="text-center">{t('generated-photo.enter-any-prompt')}</p>
          <Link href="/" className="underline">
            {t('post.back-home')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default GeneratedPhotoSection;
