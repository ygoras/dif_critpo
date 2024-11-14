
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#f4f4f4", borderBottom: "1px solid #ccc" }}>
      <h1>Dashboard de Criptomoedas</h1>
      <nav>
        <ul style={{ display: "flex", listStyle: "none", padding: 0, gap: "1rem" }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/settings">Configurações</Link></li>
          <li><Link to="/compare">Comparar Criptomoedas</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
