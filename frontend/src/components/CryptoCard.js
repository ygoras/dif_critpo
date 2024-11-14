import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './CryptoCard.css';

const CryptoCard = ({ crypto }) => {
  const {
    name,
    symbol,
    marketCap,
    macd,
    priceChange24h,
    historicalData,
  } = crypto;

  // Preparar dados para o gráfico
  const chartData = {
    labels: historicalData.map((data) => data.date),
    datasets: [
      {
        label: 'Preço',
        data: historicalData.map((data) => data.price),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  // Definir classe para variação de preço
  const priceChangeClass = priceChange24h >= 0 ? 'positive-change' : 'negative-change';

  return (
    <div className="crypto-card">
      <h2>{name} ({symbol})</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
      <p>Capitalização de Mercado: {marketCap ? `$${marketCap.toLocaleString()}` : 'N/A'}</p>
      <p>MACD: {macd !== undefined ? macd : 'N/A'}</p>
      <p className={priceChangeClass}>
        Variação 24h: {priceChange24h !== undefined ? `${priceChange24h}%` : 'N/A'}
      </p>
    </div>
  );
};

export default CryptoCard;
