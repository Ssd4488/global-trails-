import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext"; // 1. Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GlobeTrails",
  description: "Premium Travel Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Wrap the entire body content in AuthProvider */}
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}