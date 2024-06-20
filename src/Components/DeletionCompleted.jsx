import { Link } from "react-router-dom";

export const DeletedArticle = ({article_id}) => {
    return(
        <>
        <h3>Article {article_id} deleted successfully</h3>
        <Link to={`/user-page`}><button>Go To Your Page</button></Link>
        </>
    )
}