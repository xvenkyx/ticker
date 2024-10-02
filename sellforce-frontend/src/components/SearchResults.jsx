import React from "react";

const SearchResults = ({ results }) => {
  if (!Array.isArray(results)) {
    return <div>Error: Results is not an array</div>;
  }
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-2">Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="py-2">
            <span className="font-bold">{result.ticker}</span>: {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
