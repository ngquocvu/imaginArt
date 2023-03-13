import { combineClassName, stringShortening } from '@/utils';
import NextImage from 'next/image';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
type ArtWordProps = {
  src: string;
  prompt?: string;
  artist?: string | null;
  id?: string;
};
const Artwork = ({ src, prompt = '', artist = null, id }: ArtWordProps) => {
  const { t } = useTranslation('');
  const handleOnSave = () => {
    saveAs(src, `${prompt}.jpg`);
  };
  return (
    <Link href={id ? `/share/${id}` : ``}>
      <div className="relative w-full h-full group backdrop-blur-lg overflow-hidden">
        <NextImage
          alt={prompt}
          fill
          src={src}
          className={combineClassName('group-hover:brightness-50')}
        />
        <button
          onClick={handleOnSave}
          className="bg-gray-700 backdrop-blur-2xl hidden group-hover:inline-flex bg-opacity-50 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 font-bold py-2 px-2 rounded items-center absolute right-2 top-2 text-xs"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>{t('artwork.save')}</span>
        </button>
        <div className="hidden group-hover:block absolute left-2 bottom-2 font-bold text-gray-200 text-base md:text-xl m-4">
          {prompt.split(' ').length > 20
            ? stringShortening(prompt, 20) + '...'
            : prompt}
          {artist && <div className="md:text-base text-sm">- {artist} -</div>}
        </div>
      </div>
    </Link>
  );
};

export default Artwork;
