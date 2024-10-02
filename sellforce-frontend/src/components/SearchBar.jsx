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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ticker}
        onChange={handleInputChange}
        className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter stock ticker (e.g. AAPL, TSLA)"
      />
      <button
        type="submit"
        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
