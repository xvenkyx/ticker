import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const BuyResults = ({ results }) => {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    api
      .get(`/query?ticker=${results.ticker}`)
      .then((response) => {
        setPrice(response.data.currentPrice);
      })

  },[])

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-2">Buy Results</h2>
      <span className="font-bold">{results.quantity} {results.ticker} shares bought at {price}</span>
    </div>
  );
};

export default BuyResults;
