'use client';

// A reusable component for each filter section
const FilterSection = ({ title, children }) => (
  <div className="py-6 border-b border-gray-200">
    <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

// A reusable component for each checkbox item
const CheckboxItem = ({ label }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <span className="text-gray-600">{label}</span>
  </label>
);

export default function FilterSidebar() {
  return (
    <aside className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <input 
          type="text" 
          placeholder="Search destinations..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <FilterSection title="Experience Type">
        <CheckboxItem label="Beach" />
        <CheckboxItem label="Mountain" />
        <CheckboxItem label="City Break" />
        <CheckboxItem label="Safari" />
        <CheckboxItem label="Cultural" />
      </FilterSection>

      <FilterSection title="Trip Mood">
        <CheckboxItem label="Romantic" />
        <CheckboxItem label="Family Friendly" />
        <CheckboxItem label="Solo Adventure" />
      </FilterSection>

      <button className="w-full bg-blue-600 text-white font-bold py-2 mt-6 rounded-lg hover:bg-blue-700 transition-colors">
        Apply Filters
      </button>
    </aside>
  );
}
