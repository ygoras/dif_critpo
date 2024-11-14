import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CryptoNews = () => {
  const { symbol } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/news");
        const filteredNews = response.data.filter(article => 
          (article.title && article.title.toLowerCase().includes(symbol.toLowerCase())) ||
          (article.description && article.description.toLowerCase().includes(symbol.toLowerCase())) ||
          (article.content && article.content.toLowerCase().includes(symbol.toLowerCase()))
        );
        setNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [symbol]);

  if (loading) return <p>Carregando notícias...</p>;

  if (news.length === 0) return <p>Nenhuma notícia encontrada sobre {symbol}.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Notícias sobre {symbol}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {news.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "5px" }}>
            <h3>{item.title}</h3>
            <p><strong>Autor:</strong> {item.author || "Desconhecido"}</p>
            <p>{item.description || "Descrição não disponível."}</p>
            <p><a href={item.url} target="_blank" rel="noopener noreferrer">Leia mais</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
