import { useEffect, useState } from "react";
import API from "../api";

const ArticleList = ({ onSelect }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    API.get("/articles").then(res => setArticles(res.data));
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li
            key={article._id}
            className="article-item"
            onClick={() => onSelect(article)}
            >
            {article.title}
        </li>

        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
