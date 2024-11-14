import React from "react";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img
        src="https://images.vexels.com/content/259745/preview/single-bitcoin-coin-286253.png"
        alt="Carregando..."
        style={{ width: "100px", animation: "spin 2s linear infinite" }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
