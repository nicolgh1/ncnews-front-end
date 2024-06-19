import { useContext,useEffect,useState } from 'react'
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { getAllArticles, getTopics,getTopThreeArticlesPerTopic} from '../Api';
import {mostPopular } from '../utils/utils'
import { ArticlePage } from './ArticlePage';

export const Home = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [allArticles, setAllArticles] = useState([])
    const [topArticle, setTopArticle] = useState({})
    const [topics, setTopics] = useState([])
    const [top3perTopic, setTop3PerTopic] = useState({})

    useEffect(()=>{
        setLoading(true)
        setAllArticles([])
        getAllArticles().then(({articles}) => {
            setLoading(false)
            setAllArticles(articles)
            setTopArticle(mostPopular(articles))
        })
        
    },[])
    useEffect(() => {
        setTopics([])
        getTopics().then(({topics})=>{
            const topicSlugs = topics.map(topic => topic.slug)
            setTopics(topicSlugs)
        })
    }, [allArticles])

    useEffect(() => {
        const updateTop3 = {}
        setLoading(true)
        for(const topic of topics){
            getTopThreeArticlesPerTopic(topic).then(({articles}) => {
                updateTop3[topic] = articles
                setTop3PerTopic(updateTop3)
                setLoading(false)
        })
    }},[allArticles])

    if(loading) return <p>Loading...</p>

    return (
        <>
        <h1>Home</h1>
        <Link to = '/search' >
        <button>See All Articles</button>
        </Link>
        <section className='most-popular-article'>
            <Link to = {`/article/${topArticle.article_id}`}>
            <img src = {topArticle.article_img_url} className='most-popular-image'></img>
            <h2>{topArticle.title}</h2>
            </Link>
        </section>
        <section className='home-top-main'>
            {Object.keys(top3perTopic).map((topic) => {
                return (
                <div className='most-popular-article' key={topic}>
                    <h3>{topic}</h3>
                    {top3perTopic[topic].map((article) => {
                        return (
                            <Link to = {`/article/${article.article_id}`}>
                            <div key={article.article_id}>
                            <h4>{article.title}</h4>
                            <img className='image-top3-topics' src={article.article_img_url} ></img>
                        </div>
                        </Link>)
                    })}
                </div>
                )
            })}
        </section>
        </>
    )

}
