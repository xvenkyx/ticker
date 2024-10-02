import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(ticker);
  };

  const handleInputChange = (event) => {
    setTicker(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-4 mt-8">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={ticker}
          onChange={handleInputChange}
          className="w-full p-3 pl-12 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter stock ticker (e.g., AAPL, TSLA)"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.41-1.42l4.9 4.9a1 1 0 01-1.42 1.42l-4.9-4.9zM8 14A6 6 0 108 2a6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
