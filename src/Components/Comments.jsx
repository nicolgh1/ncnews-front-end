import {findUserAvatar} from '../utils/utils'
import {updateCommentVotes} from '../Api'

const Comments = ({comment,allUsers, articleComments, setArticleComments}) =>{
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
    return (
        <section className='comment'>
        <img src={findUserAvatar(comment.author,allUsers)}></img>
        <p className='author'>{comment.author}</p>
        <p className='body'>{comment.body}</p>
        <button className='likes' onClick={handleCommentLike}>Likes: {comment.votes}</button>
        <p></p>
        </section>
    )
}

export default Comments