import { useState } from "react";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import "./App.css";

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="app-container">
      <div className="article-list">
        <ArticleList onSelect={setSelectedArticle} />
      </div>

      <div className="article-detail">
        <ArticleDetail article={selectedArticle} />
      </div>
    </div>
  );
}

export default App;
