import Gallery from '@/components/Gallery/Gallery';
import Introduce from '@/components/Introduce/Introduce';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen min-w-full scroll-smooth bg-gray-900 overflow-x-hidden">
      <Head>
        <title>Open Dalle | AI Pics Generator </title>
      </Head>
      <Introduce />
      <Gallery />
    </div>
  );
}
