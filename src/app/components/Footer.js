import Link from 'next/link';

// --- Social Media Icons ---
const SocialIcon = ({ path }) => (
  <svg
    className="w-5 h-5 text-gray-400 hover:text-[#ff7f32] transition-colors cursor-pointer"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={path} />
  </svg>
);

const socialPaths = {
  facebook: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  twitter: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
  instagram: "M12.315 2c2.43 0 2.733.01 3.692.054 1.958.093 3.627 1.147 4.313 2.86.364.906.557 1.835.566 3.097.008.948.008 1.237.008 3.989 0 2.752 0 3.04-.009 3.99-.01 1.261-.202 2.19-.566 3.096-.686 1.713-2.355 2.767-4.313 2.86-.959.043-1.262.053-3.692.053-2.43 0-2.733-.01-3.692-.054-1.958-.093-3.627-1.147-4.313-2.86-.364-.906-.557-1.835-.566-3.097C2.009 15.04 2 14.751 2 12s.009-3.04.009-3.99c.009-1.261.202-2.19.566-3.096.686-1.713 2.355-2.767 4.313-2.86.959-.043 1.262-.053 3.692-.053zM12 7.087c-2.714 0-4.913 2.199-4.913 4.913S9.286 16.913 12 16.913s4.913-2.199 4.913-4.913S14.714 7.087 12 7.087zm0 8.027c-1.719 0-3.114-1.395-3.114-3.114S10.281 8.886 12 8.886s3.114 1.395 3.114 3.114S13.719 15.114 12 15.114zm5.268-8.898c-.589 0-1.067.478-1.067 1.067 0 .589.478 1.067 1.067 1.067.589 0 1.067-.478 1.067-1.067 0-.589-.478-1.067-1.067-1.067z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
};

export default function Footer() {
  return (
    // Using the deep dark blue from your brand as the background
    <footer className="bg-[#0d1b2a] text-gray-300 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Area: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
             <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Globe<span className="text-[#ff7f32]">Trails</span>.
            </h2>
            <p className="text-base leading-relaxed opacity-80">
              Curating unforgettable journeys for the modern explorer. Discover the world with confidence and style.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-5 pt-2">
              <SocialIcon path={socialPaths.facebook} />
              <SocialIcon path={socialPaths.twitter} />
              <SocialIcon path={socialPaths.instagram} />
              <SocialIcon path={socialPaths.linkedin} />
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Safety Information</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cancellation Options</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Report a Concern</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Stay Updated</h3>
            <p className="text-sm mb-4 opacity-80">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#ff7f32] transition-colors text-white placeholder:text-gray-500"
              />
              <button className="px-4 py-3 bg-[#ff7f32] text-white font-bold rounded-lg hover:bg-[#e66e25] transition-colors shadow-md">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} GlobeTrails Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}