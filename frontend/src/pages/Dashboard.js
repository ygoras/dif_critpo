
import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoGroup from "../components/CryptoGroup";

const Dashboard = () => {
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/crypto");
        const { group1, group2, group3 } = response.data;
  
        setGroup1(group1); // Consolidadas
        setGroup2(group2); // Promissoras
        setGroup3(group3); // Emergentes
  
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Dashboard de Criptomoedas</h1>
      <CryptoGroup title="Moedas Consolidadas (Longo Prazo)" data={group1} />
      <CryptoGroup title="Moedas Promissoras (Médio Prazo)" data={group2} />
      <CryptoGroup title="Moedas Emergentes (Alto Risco/Alto Retorno)" data={group3} />
    </div>
  );
};

export default Dashboard;
