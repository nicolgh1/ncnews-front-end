import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import { updateVotes, getArticleById, getArticleComments } from "../Api";
import { commentDisplay } from "../Components/Comments";

export const ArticlePage = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState({});
  const [articleComments, setArticleComments] = useState();

  useEffect(() => {
    getArticleById(article_id).then(({ article }) => {
      setCurrentArticle(article);
    });
  }, []);

  useEffect(() => {
    getArticleComments(currentArticle.article_id).then(({ comments }) => {
      setArticleComments(comments);
    });
  },[currentArticle]);


  function handleVotesClick(article_id) {
    currentArticle.votes++;
    updateVotes(article_id).then(({article}) => {
        setCurrentArticle(article)
    });
  }
  return (
    <div className="article-page">
      <h2>{currentArticle.title}</h2>
      <h3>By {currentArticle.author}</h3>
      <img className="article-img" src={currentArticle.article_img_url}></img>
      <p>{currentArticle.body}</p>
      <button
        onClick={() => {
          handleVotesClick(currentArticle.article_id);
        }}
      >
        Likes: {currentArticle.votes}
      </button>
      <section className="article-comments">
        {articleComments.map((comment) => {
            return commentDisplay(comment)
        })}
      </section>
    </div>
  );
};
