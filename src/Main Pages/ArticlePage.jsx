import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, useParams} from "react-router-dom";
import { updateVotes, getArticleById, getArticleComments,getAllUsers,postComment, deleteArticle } from "../Api";
import Comments from '../Components/Comments';
import { ErrorPage } from "./ErrorPage";
import { DeletedArticle } from "../Components/DeletionCompleted";

export const ArticlePage = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [commentInput, setCommentInput] = useState('')
  const [error, setError] = useState(null)
  const [deletedArticleId, setDeletedArticleId] = useState([])


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
  function handleVotesUpClick(article_id) {
    const votesToUpdate = {inc_votes: 1}
    setCurrentArticle({...currentArticle, votes: currentArticle.votes+1})
    updateVotes(article_id,votesToUpdate).then(({article}) => {
        setCurrentArticle(article)
    });
  }
  function handleVotesDownClick(article_id) {
    const votesToUpdate = {inc_votes: -1}
    setCurrentArticle({...currentArticle, votes: currentArticle.votes-1})
    updateVotes(article_id,votesToUpdate).then(({article}) => {
        setCurrentArticle(article)
    });
  }
  function handleDeleteArtButton(article_id){
    deleteArticle(currentArticle.article_id).then((response)=> {
      console.log(currentArticle.article_id, 'ID in handle delete')
      setDeletedArticleId([currentArticle.article_id])
    }).catch((err)=>{
      setError(err)
    })
  }
  function handleComInputChange(e){
    setCommentInput(e.target.value)
  }
  function handleCommentSubmit(){
    setArticleComments([{body: commentInput,
      votes: 0,
      author: userDetails.username},...articleComments])
    postComment(article_id,commentInput,userDetails.username)
    setCommentInput('')
  }
  if(deletedArticleId.length>0){return <DeletedArticle article_id={deletedArticleId[0]}/>}
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
        <button>Likes: {currentArticle.votes}</button>
        <button
          onClick={() => {
              handleVotesUpClick(currentArticle.article_id);
            }}
            >
          👍
        </button>
        <button onClick={() => {
              handleVotesDownClick(currentArticle.article_id);
            }}>👎</button>
        {(userDetails.username===currentArticle.author)? <><button onClick={handleDeleteArtButton}>Delete Article</button></>: null}
        <section className="comment-input">
          {(userDetails.username)? 
          <>
          <h4>Comment as {userDetails.username}</h4>
          <input type="text" onChange={handleComInputChange} value={commentInput}></input>
          <button onClick={handleCommentSubmit}>Submit Comment</button>
          </> : <><Link to='/login'><h3>Log In to Comment</h3></Link></>}
        </section>
        <section className="article-comments">
          {articleComments.map((comment) => {
              return <Comments key={comment.comment_id} comment={comment} allUsers={allUsers} articleComments={articleComments} setArticleComments={setArticleComments} />
            })}
        </section>
      </div>
    );
}
};
