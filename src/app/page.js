import HeroSection from './components/HeroSection';
import FeaturedPackages from './components/FeaturedPackages';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturedPackages />
    </main>
  );
}