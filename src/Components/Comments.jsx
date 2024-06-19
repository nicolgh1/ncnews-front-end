import {findUserAvatar} from '../utils/utils'
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
        updateCommentVotes(comment.comment_id)
    }
    const handleDeleteClick = ()=>{
        const newCommArray = articleComments.filter((element) => element.comment_id !== comment.comment_id)
        setArticleComments(newCommArray)
        deleteComment(comment.comment_id)
    }
    // console.log(comment.author,'author')
    // console.log(allUsers,'all users')
    return (
        <section className='comment'>
        <img src={findUserAvatar(comment.author,allUsers)}></img>
        <p className='author'>{comment.author}</p>
        <p className='body'>{comment.body}</p>
        <button className='likes' onClick={handleCommentLike}>Likes: {comment.votes}</button>
        {(userDetails.username===comment.author)? <button onClick={handleDeleteClick}>Delete</button>:null}
        </section>
    )
}

export default Comments