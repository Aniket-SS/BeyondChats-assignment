const ArticleDetail = ({ article }) => {
  if (!article)
    return (
      <p className="article-placeholder">
        Select an article to view details
      </p>
    );

  return (
    <div>
      <h2>{article.title}</h2>

      <h3>Original Content</h3>
      <p>{article.originalContent}</p>

      {article.updatedContent && (
        <>
          <h3>Enhanced Content</h3>
          <p>{article.updatedContent}</p>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
