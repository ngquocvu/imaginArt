import Gallery from '@/components/Gallery/Gallery';
import Introduce from '@/components/Introduce/Introduce';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen w-full scroll-smooth bg-gray-900 overflow-x-hidden">
      <Head>
        <title>ImaginArt | Home </title>
      </Head>
      <Introduce />
      <Gallery />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};
