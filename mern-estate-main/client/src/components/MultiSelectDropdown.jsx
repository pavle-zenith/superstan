import React, { useState } from 'react';

const MultiSelectDropdown = ({ options }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleSelection = (option) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(option)) {
        return prevSelectedItems.filter((item) => item !== option);
      } else {
        return [...prevSelectedItems, option];
      }
    });
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
        Select Options
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <a
                key={option}
                onClick={() => toggleSelection(option)}
                className={`block px-4 py-2 text-sm cursor-pointer ${selectedItems.includes(option) ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;