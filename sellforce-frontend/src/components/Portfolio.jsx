import React, { useContext } from 'react';

const Portfolio = ({ portfolio }) => {
  if (!Array.isArray(portfolio)) {
    return <div className="text-red-500 text-center">Invalid portfolio data</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="table-auto w-full bg-white border border-gray-200">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Ticker</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Quantity</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Buy/Sell</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((stock, index) => (
            <tr key={index} className="bg-white hover:bg-gray-100 transition duration-150 ease-in-out">
              <td className="px-4 py-3 border-b border-gray-300 text-center">{stock.ticker}</td>
              <td className="px-4 py-3 border-b border-gray-300 text-center">{stock.quantity}</td>
              <td className="px-4 py-3 border-b border-gray-300 text-center">{stock.buysell}</td>
              <td className="px-4 py-3 border-b border-gray-300 text-center">{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
