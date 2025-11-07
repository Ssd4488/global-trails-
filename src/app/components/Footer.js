import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">GlobeTrails</h2>
            <p className="text-gray-400 text-base">
              Your adventure, our expertise. Discover and book unique travel experiences worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/destinations" className="text-base text-gray-400 hover:text-white">Destinations</Link></li>
              <li><Link href="/contact" className="text-base text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} GlobeTrails. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}