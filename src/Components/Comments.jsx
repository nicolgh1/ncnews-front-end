
import {updateCommentVotes, deleteComment} from '../Api'
import { useContext} from "react";
import { UserContext } from "../UserContext";

const Comments = ({comment,allUsers, articleComments, setArticleComments}) =>{
    const { userDetails, setUserDetails } = useContext(UserContext);
    const handleCommentLike = () => {
        for(let i=0; i<articleComments.length; i++){
            if(articleComments[i].comment_id === comment.comment_id){
                const newCommArray = [...articleComments]
                newCommArray[i] = { ...newCommArray[i], votes: newCommArray[i].votes + 1 }
                setArticleComments(newCommArray)
            }
        }
        const votesToUpdate = {inc_votes: 1}
        updateCommentVotes(comment.comment_id,votesToUpdate)
    }
    const handleCommentDislike = ()=>{
        for(let i=0; i<articleComments.length; i++){
            if(articleComments[i].comment_id === comment.comment_id){
                const newCommArray = [...articleComments]
                newCommArray[i] = { ...newCommArray[i], votes: newCommArray[i].votes - 1 }
                setArticleComments(newCommArray)
            }
        }
        const votesToUpdate = {inc_votes: -1}
        updateCommentVotes(comment.comment_id,votesToUpdate)
    }
    const handleDeleteClick = ()=>{
        const newCommArray = articleComments.filter((element) => element.comment_id !== comment.comment_id)
        setArticleComments(newCommArray)
        deleteComment(comment.comment_id)
    }

    return (
        <section className='comment'>
        <p className='author'>{comment.author}</p>
        <p className='body'>{comment.body}</p>
        <button>Likes: {comment.votes}</button>
        <button className='likes' onClick={handleCommentLike}>👍</button>
        <button className='likes' onClick={handleCommentDislike}>👎</button>
        {(userDetails.username===comment.author)? <button onClick={handleDeleteClick}>Delete</button>:null}
        </section>
    )
}

export default Comments