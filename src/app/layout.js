import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// 1. Import your new floating component
import FloatingContact from './components/FloatingContact'; 

export const metadata = {
  title: 'GlobeTrails | Premium Travel',
  description: 'Curated journeys designed for the bold.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <Navbar />
        
        {/* Your page content */}
        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

        {/* 2. Add the floating contact buttons here so they appear on every page */}
        <FloatingContact />
        
      </body>
    </html>
  );
}