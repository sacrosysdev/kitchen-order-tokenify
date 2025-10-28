import { useState } from 'react';

const SearchSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('TakeAway');

  const options = ['Eating Here', 'TakeAway'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className=" bg-[#F1F1F1] flex items-center border border-[#374151] p-5 ">
      <div className="flex gap-2 w-full items-center">
        {/* Search Input */}
        <div className='w-2/3'>
            <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter Token Number"
          className="flex-1 px-5 py-3 border border-[#4B5563] bg-white rounded-lg text-sm outline-none focus:border-green-500 transition-colors  w-full"
        />
        </div>

        {/* Dropdown Button */}
        <div className="relative w-1/3 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-5 py-3 bg-[#16A34A] hover:bg-green-600 cursor-pointer text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-between"
          >
            <span>{selectedOption}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="w-full px-5 py-3 text-left text-sm hover:bg-gray-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SearchSection