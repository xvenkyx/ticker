import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import TransactionForm from "./components/TransactionForm";
import Portfolio from "./components/Portfolio";
import SearchResults from "./components/SearchResults";
import BuyResults from "./components/BuyResults";
import SellResults from "./components/SellResults";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const App = () => {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [user_id, setUser_id] = useState(1);
  const [portfolio, setPortfolio] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [buyResults, setBuyResults] = useState(null);
  const [sellResults, setSellResults] = useState(null);

  const [loading, setLoading] = useState(false); // Add this state for loading
  const [error, setError] = useState(null); // Add this state for errors

  useEffect(() => {
    setLoading(true); // Start loading
    api
      .get(`/portfolio?user_id=${user_id}`)
      .then((response) => {
        setPortfolio(response.data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setError("Failed to load portfolio");
        setLoading(false); // Stop loading
      });
  }, [user_id]);

  const handleSearch = (ticker) => {
    api
      .get(`/query?ticker=${ticker}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBuy = (data) => {
    setLoading(true); // Show loading while the transaction is happening
    api.post('/buy', { ...data, user_id: user_id })
      .then(response => {
        setBuyResults(response.data);
        // Fetch the updated portfolio
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then(response => {
        setPortfolio(response.data); // Update the portfolio
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to complete purchase");
        setLoading(false);
      });
  };

  const handleSell = (data) => {
    setLoading(true); // Show loading while the transaction is happening
    api.post('/sell', { ...data, user_id: user_id })
      .then(response => {
        setSellResults(response.data);
        // Fetch the updated portfolio
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then(response => {
        setPortfolio(response.data); // Update the portfolio
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to complete sale");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Stock Trader</h1>
      <SearchBar onSearch={handleSearch} />
      {searchResults && <SearchResults results={searchResults} />}
      
      <TransactionForm onBuy={handleBuy} onSell={handleSell} />
      
      {buyResults && <BuyResults results={buyResults} />}
      {sellResults && <SellResults results={sellResults} />}

      {loading && <div>Loading...</div>} {/* Add this for loading */}
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Add this for errors */}
      {!loading && portfolio && <Portfolio portfolio={portfolio} />}
    </div>
  );
};

export default App;
