import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams} from "react-router-dom";
import { updateVotes, getArticleById, getArticleComments,getAllUsers,postComment } from "../Api";
import Comments from '../Components/Comments';
import { ErrorPage } from "./ErrorPage";

export const ArticlePage = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [commentInput, setCommentInput] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getArticleById(article_id).then(({ article }) => {
      setCurrentArticle(article);
      setLoading(false)
    }).catch((err)=>{
        setError(err)
    })
  }, []);

  useEffect(() => {
    setLoading(true)
    getArticleComments(article_id).then(({ comments }) => {
      setArticleComments(comments);
      setLoading(false)
    }).catch((err)=>{
        setError(err)
    })
  },[currentArticle]);

  useEffect(() => {
    getAllUsers().then(({users}) => {
        setAllUsers(users)
    }).catch((err)=>{
        setError(err)
    })
  },[])
  function handleVotesClick(article_id) {
    setCurrentArticle({...currentArticle, votes: currentArticle.votes+1})
    updateVotes(article_id).then(({article}) => {
        setCurrentArticle(article)
    });
  }
  function handleComInputChange(e){
    setCommentInput(e.target.value)
  }
  function handleCommentSubmit(){
    setArticleComments([...articleComments,{body: commentInput,
          votes: 0,
          author: userDetails.username}])
    postComment(article_id,commentInput,userDetails.username)
    setCommentInput('')
  }
  if(error){
      console.log(error, 'in err func')
      return (
        <ErrorPage error = {error}/>
      )
    
} else if(loading){
    return (
        <p>Loading...</p>
    )
  }
else {
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
              return <Comments key={comment.comment_id} comment={comment} allUsers={allUsers} articleComments={articleComments} setArticleComments={setArticleComments} />
            })}
        </section>
        <section className="comment-input">
          {(userDetails.username)? 
          <>
          <h4>Comment as {userDetails.username}</h4>
          <input type="text" onChange={handleComInputChange} value={commentInput}></input>
          <button onClick={handleCommentSubmit}>Submit Comment</button>
          </> : null}
        </section>
      </div>
    );
}
};
