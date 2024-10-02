import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import TransactionForm from "./components/TransactionForm";
import Portfolio from "./components/Portfolio";
import SearchResults from "./components/SearchResults";
import BuyResults from "./components/BuyResults";
import SellResults from "./components/SellResults";
import './App.css'; // Import your CSS file

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const PriceContext = React.createContext(null);

const App = () => {
  const [price, setPrice] = useState(0);
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [user_id, setUser_id] = useState(1);
  const [portfolio, setPortfolio] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [buyResults, setBuyResults] = useState(null);
  const [sellResults, setSellResults] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/portfolio?user_id=${user_id}`)
      .then((response) => {
        setPortfolio(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load portfolio");
        setLoading(false);
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
    setLoading(true);
    api
      .get(`/query?ticker=${data.ticker}`)
      .then((response) => {
        const stockPrice = response.data.currentPrice;
        setPrice(stockPrice);
        return api.post("/buy", {
          ...data,
          price: stockPrice,
          user_id: user_id,
        });
      })
      .then((response) => {
        setBuyResults(response.data);
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then((response) => {
        setPortfolio(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to complete purchase");
        setLoading(false);
      });
  };

  const handleSell = (data) => {
    setLoading(true);
    api
      .get(`/query?ticker=${data.ticker}`)
      .then((response) => {
        const stockPrice = response.data.currentPrice;
        setPrice(stockPrice);
        return api.post("/sell", {
          ...data,
          price: stockPrice,
          user_id: user_id,
        });
      })
      .then((response) => {
        setSellResults(response.data);
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then((response) => {
        setPortfolio(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to complete sale");
        setLoading(false);
      });
  };

  return (
    <PriceContext.Provider value={price}>
      <Router>
        <div className="min-h-screen flex flex-col animated-background">
          {/* Navbar */}
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 text-white font-bold text-lg">
                    Stock Trader
                  </div>
                  <div className="ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Home
                      </Link>
                      <Link
                        to="/portfolio"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Portfolio
                      </Link>
                      <Link
                        to="/transactions"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Transactions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-grow flex items-center justify-center">
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
              <div className="content-background p-4 w-full rounded-lg">
                <Routes>
                  {/* Home Route */}
                  <Route
                    path="/"
                    element={
                      <>
                        <SearchBar onSearch={handleSearch} />
                        {searchResults && <SearchResults results={searchResults} />}
                      </>
                    }
                  />

                  {/* Portfolio Route */}
                  <Route
                    path="/portfolio"
                    element={
                      !loading && portfolio ? (
                        <Portfolio portfolio={portfolio} />
                      ) : (
                        <div className="text-center py-4 text-blue-600">Loading...</div>
                      )
                    }
                  />

                  {/* Transactions Route */}
                  <Route
                    path="/transactions"
                    element={
                      <>
                        <TransactionForm onBuy={handleBuy} onSell={handleSell} />
                        {buyResults && <BuyResults results={buyResults} />}
                        {sellResults && <SellResults results={sellResults} />}
                        {loading && (
                          <div className="text-center py-4 text-blue-600">Loading...</div>
                        )}
                        {error && (
                          <div className="text-center py-4 text-red-500">
                            {error}
                          </div>
                        )}
                      </>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-800 py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-400">
                &copy; 2024 Stock Trader, Inc. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </PriceContext.Provider>
  );
};

export default App;
