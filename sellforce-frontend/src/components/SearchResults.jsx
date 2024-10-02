import React from "react";

const SearchResults = ({ results }) => {
  console.log(results.symbol);
  
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-2">Search Results</h2>
      <ul>
        <li>
          <span className="font-bold">{results.symbol}</span>: {results.longName}
        </li>
        <li>
          <span className="font-bold">Current Price : </span>{results.currentPrice} Current Ratio : {results.currentRatio}
        </li>
      </ul>
    </div>
  );
};

export default SearchResults;
