import Gallery from '@/components/Gallery/Gallery';
import Introduce from '@/components/Introduce/Introduce';

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll scroll-smooth">
      <Introduce />
      <Gallery />
    </div>
  );
}
