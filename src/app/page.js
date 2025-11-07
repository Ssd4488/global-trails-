import HeroSection from "./components/HeroSection";
import FeaturedPackages from "./components/FeaturedPackages";
import Testimonials from "./components/Testimonials"; // Import the new section

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Our new, live Featured Packages section */}
      <FeaturedPackages />
       <Testimonials /> 
     
    </>
  );
}