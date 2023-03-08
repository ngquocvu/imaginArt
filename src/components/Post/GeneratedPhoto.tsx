import { useStates } from '@/slices/GeneratedPhotoSlice';
import { useState, useEffect } from 'react';
import Loader from '../Common/Loader';
import Artwork from '../Gallery/Artwork';
import PostForm from './PostForm';

const GeneratedPhotoSection = () => {
  const { generatedPhoto } = useStates();
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

  return (
    <div className="h-[20rem] w-[20rem] md:h-[40rem] md:w-[40rem] relative bg-gray-800 font-mono text-xs md:text-lg bg-opacity-50 dark:text-gray-100 rounded-xl overflow-hidden shadow-lg">
      {generatedPhoto.pending ? (
        <div className="flex flex-col gap-5 h-full">
          <Loader />
          <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4 text-xs md:text-sm text-gray-200 p-4">
            <p>{time}s</p>
            <p>Estimated time: 10-20s</p>
            <p>
              Tips: Hover the generated photo to see its prompt and download
              button
            </p>
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
        <div className="w-full h-full flex flex-col justify-center items-center text-gray-200 p-4">
          <p className="text-center">
            Enter any prompt in your mind and click draw to generate.
          </p>
        </div>
      )}
    </div>
  );
};

export default GeneratedPhotoSection;
