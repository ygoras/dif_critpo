import React from "react";

const NewsList = ({ news }) => {
  return (
    <ul>
      {news.map((article, index) => (
        <li key={index}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
