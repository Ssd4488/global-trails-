'use client';

const FilterSection = ({ title, children }) => (
  <div className="py-6 border-b border-gray-200">
    <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const CheckboxItem = ({ label, value, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input type="checkbox" value={value} checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <span className="text-gray-600">{label}</span>
  </label>
);

// This component now receives props to manage its state from the parent page
export default function FilterSidebar({ filters, onFilterChange }) {
  
  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  return (
    <aside className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-md h-fit">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <FilterSection title="Experience Type">
        <CheckboxItem label="Beach" value="Beach" checked={filters.experience?.includes('Beach')} onChange={() => handleCheckboxChange('experience', 'Beach')} />
        <CheckboxItem label="Mountain" value="Mountain" checked={filters.experience?.includes('Mountain')} onChange={() => handleCheckboxChange('experience', 'Mountain')} />
        <CheckboxItem label="City Break" value="City Break" checked={filters.experience?.includes('City Break')} onChange={() => handleCheckboxChange('experience', 'City Break')} />
        <CheckboxItem label="Cultural" value="Cultural" checked={filters.experience?.includes('Cultural')} onChange={() => handleCheckboxChange('experience', 'Cultural')} />
      </FilterSection>

      <FilterSection title="Trip Mood">
        <CheckboxItem label="Romantic" value="Romantic" checked={filters.mood?.includes('Romantic')} onChange={() => handleCheckboxChange('mood', 'Romantic')} />
        <CheckboxItem label="Family Friendly" value="Family Friendly" checked={filters.mood?.includes('Family Friendly')} onChange={() => handleCheckboxChange('mood', 'Family Friendly')} />
        <CheckboxItem label="Solo Adventure" value="Solo Adventure" checked={filters.mood?.includes('Solo Adventure')} onChange={() => handleCheckboxChange('mood', 'Solo Adventure')} />
      </FilterSection>
    </aside>
  );
}

