import React from "react";
import { useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoCard = ({ crypto }) => {
  const navigate = useNavigate();

  if (!crypto) return null;

  // Dados para o gráfico
  const historicalData = crypto.historicalData || [];
  const hasHistoricalData = historicalData.length > 0;

  const chartData = {
    labels: hasHistoricalData ? historicalData.map(data => data.date) : [],
    datasets: [
      {
        label: 'Preço',
        data: hasHistoricalData ? historicalData.map(data => data.price) : [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${crypto.symbol} Histórico de Preço`,
      },
    },
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "300px" }}>
      <h3>{crypto.symbol}</h3>
      {hasHistoricalData ? (
        <div style={{ height: "200px", marginBottom: "1rem" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p style={{ color: "gray", textAlign: "center" }}>Dados históricos indisponíveis</p>
      )}
      <p>Preço: ${crypto.price || "N/A"}</p>
      <p>Variação (24h): {crypto.price_change_24h || "N/A"}%</p>
      <p>Capitalização: ${crypto.market_cap || "N/A"}</p>
      <p>Volume: ${crypto.volume || "N/A"}</p>
      <p>RSI: {crypto.rsi || "N/A"}</p>
      <p>MACD: {crypto.macd || "N/A"}</p>
      <div
        style={{
          padding: "0.5rem",
          backgroundColor: crypto.buy_signal ? "green" : crypto.sell_signal ? "red" : "gray",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {crypto.buy_signal ? "Comprar" : crypto.sell_signal ? "Vender" : "Neutro"}
      </div>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/news/${crypto.symbol}`)}
      >
        Notícias sobre
      </button>
    </div>
  );
};

export default CryptoCard;
