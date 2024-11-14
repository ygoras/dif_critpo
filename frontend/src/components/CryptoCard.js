import React from "react";
import { useNavigate } from "react-router-dom";

const CryptoCard = ({ crypto }) => {
  const navigate = useNavigate();

  if (!crypto) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "300px" }}>
      <h3>{crypto.symbol}</h3>
      <p>Preço: ${crypto.price || "N/A"}</p>
      <p>Variação (24h): {crypto.price_change_24h !== undefined ? `${crypto.price_change_24h}%` : "N/A"}</p>
      <p>Capitalização: ${crypto.market_cap || "N/A"}</p>
      <p>Volume: ${crypto.volume || "N/A"}</p>
      <p>RSI: {crypto.rsi || "N/A"}</p>
      <p>MACD: {crypto.macd || "N/A"}</p>
      <p>EMA: {crypto.ema || "N/A"}</p>
      <p>ADX: {crypto.adx || "N/A"}</p>
      <p>Stochastic: {crypto.stochastic || "N/A"}</p>
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
