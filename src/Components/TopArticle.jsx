import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllArticles } from "../Api"

export const MostPopularArt = () =>{
    const filterOptions = {sort_by: 'votes', order: 'desc', limit:1}
    const [loading, setLoading] = useState(false)
    const [topArticle, setTopArticle] = useState({})
    useEffect(()=>{
        setLoading(true)
        getAllArticles(filterOptions).then(({articles}) => {
            setTopArticle(articles[0])
            setLoading(false)
        })
        
    },[])

    if(loading) return <p>Loading...</p>
    return (
        <section className='most-popular-article'>
            <Link to = {`/article/${topArticle.article_id}`}>
            <img src = {topArticle.article_img_url} className='most-popular-image'></img>
            <h2>{topArticle.title}</h2>
            </Link>
        </section>
    )
}
