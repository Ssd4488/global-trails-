'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Collapsible Section ---
const FilterSection = ({ title, children, count = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center w-full group"
      >
        <h3 className="font-bold text-gray-900 flex items-center text-lg">
          {title}
          {count > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3, ease: "circOut" }}
          className="text-gray-400 group-hover:text-blue-600 transition-colors"
        >
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Premium Checkbox Item ---
const CheckboxItem = ({ label, value, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer group select-none">
    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400 bg-white'}`}>
      {checked && (
        <motion.svg 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-3.5 h-3.5 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      )}
    </div>
    <span className={`text-gray-700 transition-colors ${checked ? 'font-semibold text-gray-900' : 'group-hover:text-blue-600'}`}>
      {label}
    </span>
  </label>
);

// --- Main Component ---
export default function FilterSidebar({ filters, onFilterChange }) {
  const activeExperienceCount = filters.experience?.length || 0;
  const activeMoodCount = filters.mood?.length || 0;
  const totalActiveFilters = activeExperienceCount + activeMoodCount;

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  const handleClearAll = () => {
    onFilterChange('experience', []);
    onFilterChange('mood', []);
  };

  return (
    <aside className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 h-fit sticky top-24">
      
      {/* Header Area with Clear All */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">Filters</h2>
        {totalActiveFilters > 0 && (
          <button 
            onClick={handleClearAll} 
            className="text-sm font-semibold text-blue-600 hover:text-orange-500 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Enhanced Search Bar */}
      <div className="relative mb-6 group">
        <input 
          type="text" 
          placeholder="Search destinations..."
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 font-medium"
        />
        <svg className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      {/* Filter Sections */}
      <FilterSection title="Experience" count={activeExperienceCount}>
        {['Beach', 'Mountain', 'City Break', 'Cultural', 'Safari'].map((item) => (
          <CheckboxItem 
            key={item} 
            label={item} 
            value={item} 
            checked={filters.experience?.includes(item)} 
            onChange={() => handleCheckboxChange('experience', item)} 
          />
        ))}
      </FilterSection>

      <FilterSection title="Trip Mood" count={activeMoodCount}>
        {['Romantic', 'Family Friendly', 'Solo Adventure'].map((item) => (
          <CheckboxItem 
            key={item} 
            label={item} 
            value={item} 
            checked={filters.mood?.includes(item)} 
            onChange={() => handleCheckboxChange('mood', item)} 
          />
        ))}
      </FilterSection>
    </aside>
  );
}