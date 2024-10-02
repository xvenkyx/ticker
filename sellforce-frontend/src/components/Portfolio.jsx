import React, { useContext } from 'react';

const Portfolio = ({ portfolio }) => {
  
  if (!Array.isArray(portfolio)) {
    return <div>Invalid portfolio data</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Ticker</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Buy/Sell</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((stock, index) => (
            <tr key={index} className="bg-white hover:bg-gray-100">
              <td className="px-4 py-2 text-center">{stock.ticker}</td>
              <td className="px-4 py-2 text-center">{stock.quantity}</td>
              <td className="px-4 py-2 text-center">{stock.buysell}</td>
              <td className="px-4 py-2 text-center">{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;