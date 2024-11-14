import React from "react";
import CryptoCard from "./CryptoCard";

const CryptoGroup = ({ title, data }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {data.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default CryptoGroup;
