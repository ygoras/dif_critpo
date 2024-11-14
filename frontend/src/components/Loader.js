import React from "react";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img
        src="https://cdn.pixabay.com/photo/2021/05/24/07/24/bitcoin-6270061_960_720.png"
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
