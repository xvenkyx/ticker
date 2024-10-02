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
  }, []);

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

  // const handleBuy = (data) => {
  //   setLoading(true);
  //   // Show loading while the transaction is happening
  //   api
  //   .post("/buy", { ...data, user_id: user_id })
  //   .then((response) => {
  //     console.log(response.data)
  //     api.get(`/query?ticker=${response.data.ticker}`).then((response) => {
  //       setPrice(response.data.currentPrice);
  //     }); 
  //     setBuyResults(response.data);
  //       // Fetch the updated portfolio
  //       return api.get(`/portfolio?user_id=${user_id}`);
  //     })
  //     .then((response) => {
  //       setPortfolio(response.data); // Update the portfolio
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("Failed to complete purchase");
  //       setLoading(false);
  //     });
  // };

  const handleBuy = (data) => {
    setLoading(true); // Start loading

    // Step 1: Fetch the price first before making the buy request
    api
      .get(`/query?ticker=${data.ticker}`)
      .then((response) => {
        const stockPrice = response.data.currentPrice; // Step 2: Get the fetched price
        setPrice(stockPrice); // Update price state
        // Step 3: Make the buy request with the price included in the data
        return api.post("/buy", {
          ...data,
          price: stockPrice, // Include the price in the buy request
          user_id: user_id,
        });
      })
      .then((response) => {
        setBuyResults(response.data); // Update buy results
        // Step 4: Fetch the updated portfolio
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then((response) => {
        setPortfolio(response.data); // Update the portfolio
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setError("Failed to complete purchase");
        setLoading(false);
      });
  };

  const handleSell = (data) => {
    setLoading(true); // Start loading

    // Step 1: Fetch the price first before making the buy request
    api
      .get(`/query?ticker=${data.ticker}`)
      .then((response) => {
        const stockPrice = response.data.currentPrice; // Step 2: Get the fetched price
        setPrice(stockPrice); // Update price state
        // Step 3: Make the buy request with the price included in the data
        return api.post("/sell", {
          ...data,
          price: stockPrice, // Include the price in the buy request
          user_id: user_id,
        });
      })
      .then((response) => {
        setBuyResults(response.data); // Update buy results
        // Step 4: Fetch the updated portfolio
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then((response) => {
        setPortfolio(response.data); // Update the portfolio
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setError("Failed to complete sale");
        setLoading(false);
      });
  };
  const handleSelll = (data) => {
    setLoading(true); // Show loading while the transaction is happening
    api
      .post("/sell", { ...data, user_id: user_id })
      .then((response) => {
        setSellResults(response.data);
        // Fetch the updated portfolio
        return api.get(`/portfolio?user_id=${user_id}`);
      })
      .then((response) => {
        setPortfolio(response.data); // Update the portfolio
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to complete sale");
        setLoading(false);
      });
  };

  return (
    <PriceContext.Provider value={price}>
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
    </PriceContext.Provider>
  );
};

export default App;
