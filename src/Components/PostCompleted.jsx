import { Link } from "react-router-dom"

export const PostCompleted = ({article_id}) => {
    console.log(article_id, 'art id in post comp')
    return (
        <>
        <h3>Article submited successfully</h3>
        <Link to={`/article/${article_id}`}>See Article</Link>
        </>
    )
}
