import React, { useContext, useState } from 'react';
import { PriceContext } from '../App';

const TransactionForm = ({ onBuy, onSell }) => {
  const price = useContext(PriceContext);
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleBuySubmit = (event) => {
    event.preventDefault();
    onBuy({ ticker, quantity, price });
  };

  const handleSellSubmit = (event) => {
    event.preventDefault();
    onSell({ ticker, quantity });
  };

  return (
    <form className="flex flex-col space-y-4 mb-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={ticker}
          onChange={(event) => setTicker(event.target.value)}
          className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Stock Ticker (e.g., AAPL)"
        />
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Quantity"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleBuySubmit}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Buy
        </button>
        <button
          type="button"
          onClick={handleSellSubmit}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Sell
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
