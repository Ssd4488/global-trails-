'use client';

const sortOptions = ["✨ Featured", "💸 Price (Low-High)", "🌟 Top Rated"];

// This component now receives props to manage state and display info
export default function SortingBar({ activeSort, onSortChange, resultCount }) {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-between mb-8 flex-wrap gap-4">
      <div className="flex items-center gap-2">
        {sortOptions.map(option => (
          <button 
            key={option}
            onClick={() => onSortChange(option)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200
              ${activeSort === option 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {option}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 font-medium">Showing <span className="text-gray-900">{resultCount}</span> packages</p>
    </div>
  );
}

