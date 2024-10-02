import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const SellResults = ({ results }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (results?.ticker) {  // Ensure ticker is defined before making the API call
      api
        .get(`/query?ticker=${results.ticker}`)
        .then((response) => {
          setPrice(response.data.currentPrice);
        })
        .catch((error) => {
          console.error("Error fetching price:", error);
        });
    }
  }, [results.ticker]); // Use results.ticker as the dependency

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-2">Sell Results</h2>
      <span className="font-bold">
        {results.quantity} {results.ticker} shares sold at {price}
      </span>
    </div>
  );
};

export default SellResults;
