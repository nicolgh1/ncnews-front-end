import { useContext,useEffect,useState } from 'react'
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { getAllArticles, getTopics} from '../Api';
import { MostPopularArt } from '../Components/TopArticle';
import { ErrorPage } from './ErrorPage';

export const Home = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [topics, setTopics] = useState([])
    const [top3perTopic, setTop3PerTopic] = useState({})
    const [error, setError] = useState(null)


    useEffect(() => {
        setTopics([])
        getTopics().then(({topics})=>{
            const topicSlugs = topics.map(topic => topic.slug)
            setTopics(topicSlugs)
        }).catch((err)=>{
            setError(err)
        })
    }, [])
    
    useEffect(() => {
        if (topics.length === 0) return;

        setLoading(true);
        const updateTop3 = {};
        const promises = topics.map((top) => {
            const filterOptions = { topic: top, sort_by: 'votes', order: 'desc', limit: 3 };
            return getAllArticles(filterOptions)
                .then(({ articles }) => {
                    updateTop3[top] = articles;
                })
                .catch((err) => {
                    setError(err);
                });
        });

        Promise.all(promises).then(() => {
            setTop3PerTopic(updateTop3);
            setLoading(false);
        });
    }, [topics]);

    
    if(loading) return <p>Loading...</p>
    if(error) return (<ErrorPage error={error}/>)

    return (
        <>
        <h1>Home</h1>
        <Link to = '/search' >
        <button>See All Articles</button>
        </Link>
        <MostPopularArt/>
        <section className='home-top-main'>
            {Object.keys(top3perTopic).map((topic) => {
                return (
                <div className='most-popular-article' key={topic}>
                    <h3>{topic}</h3>
                    {top3perTopic[topic].map((article) => {
                        return (
                            <Link to = {`/article/${article.article_id}`} key={article.article_id}>
                            <div >
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
