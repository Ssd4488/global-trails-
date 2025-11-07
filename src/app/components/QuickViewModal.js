'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
    ))}
  </div>
);

export default function QuickViewModal({ pkg, onClose }) {
  if (!pkg) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-2xl"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 md:h-full">
            <Image src={pkg.imageUrl} alt={pkg.destination} layout="fill" objectFit="cover" />
          </div>
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{pkg.destination}</h2>
                <div className="mt-2">
                  <StarRating rating={pkg.rating} />
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700">&times;</button>
            </div>
            <div className="mt-6 text-gray-600 space-y-4 flex-grow">
              <p><strong>Duration:</strong> {pkg.duration} Days</p>
              <p><strong>Price:</strong> <span className="text-2xl font-bold text-blue-600">₹{pkg.price.toLocaleString('en-IN')}</span> per person</p>
              <h3 className="font-semibold text-gray-800 pt-4">Highlights:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Visit iconic landmarks and cultural sites.</li>
                <li>Stay in premium, hand-picked accommodations.</li>
                <li>Enjoy complimentary daily breakfast.</li>
                <li>Private guided tours included.</li>
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-3 mt-6 rounded-lg hover:bg-blue-700 transition-colors">
              View Full Details
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
