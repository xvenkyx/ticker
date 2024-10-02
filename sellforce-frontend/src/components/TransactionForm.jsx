import React, { useState } from 'react';

const TransactionForm = ({ onBuy, onSell }) => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleBuySubmit = (event) => {
    event.preventDefault();
    onBuy({ ticker, quantity });
  };

  const handleSellSubmit = (event) => {
    event.preventDefault();
    onSell({ ticker, quantity });
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={ticker}
        onChange={(event) => setTicker(event.target.value)}
        className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Ticker"
      />
      <input
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Quantity"
      />
      <button
        type="button"
        onClick={handleBuySubmit}
        className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Buy
      </button>
      <button
        type="button"
        onClick={handleSellSubmit}
        className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sell
      </button>
    </div>
  );
};

export default TransactionForm;