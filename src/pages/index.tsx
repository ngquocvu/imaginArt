import Gallery from '@/components/Gallery/Gallery';
import Introduce from '@/components/Introduce/Introduce';

export default function Home() {
  return (
    <div className="scroll-smooth bg-gray-900 overflow-x-hidden">
      <Introduce />
      <Gallery />
    </div>
  );
}
