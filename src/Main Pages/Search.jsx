import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { getAllArticles, getTopics } from "../Api";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { ErrorPage } from './ErrorPage';

export const Search = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null)
  const [filterOptions, setFilterOptions] = useState({
    topic: "",
    sort_by: "votes",
    order: "desc",
    limit: 10,
  });
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setAllArticles([]);

    let filters = { ...filterOptions }
        if (filters.topic === "all" || filters.topic === "") {
            delete filters.topic;
        }
    getAllArticles(filters).then(({ articles }) => {

      setLoading(false);
      setAllArticles(articles);
    }).catch((err)=>{
      setError(err)
  })
  }, [filterOptions]);

  useEffect(() => {
    setTopics([]);
    getTopics().then(({ topics }) => {
      const topicSlugs = topics.map((topic) => topic.slug);
      setTopics(topicSlugs);
    }).catch((err)=>{
      setError(err)
  })
  }, []);

  function updateFilterOptions(newOptions) {
    setFilterOptions((curr) => {
        const updatedOptions = { ...curr, ...newOptions };
        const params = new URLSearchParams(updatedOptions);
        setSearchParams(params);
        return updatedOptions;
    });
}

  function handleTopicChange(e) {
    updateFilterOptions({ topic: e.target.value })
  }
  function handleSortByChange(e) {
    updateFilterOptions({ sort_by: e.target.value })
  }
  function handleOrderChange(e) {
    updateFilterOptions({ order: e.target.value })
  }
  function handleLimitChange(e){
    updateFilterOptions({ limit: e.target.value })
  }
  if(error) {
    return (<ErrorPage error={error}/>)
  }
    else 
  if(loading) {return <p>Loading...</p>}
  else 
  return (
    <>
      <h1>Search</h1>
      <form>
        <label>
          Category
          <select onChange={handleTopicChange} value={filterOptions.topic}>
            <option value={"all"}>All</option>
            {topics.map((topic) => {
              return (
                <option value={topic} key={topic}>
                  {topic}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Sort by
          <select onChange={handleSortByChange} value={filterOptions.sort_by}>
            <option value={"author"} key={"author"}>
              Author
            </option>
            <option value={"title"} key={"title"}>
              Title
            </option>
            <option value={"votes"} key={"votes"}>
              Votes
            </option>
            <option value={"comment_count"} key={"comment_count"}>
              Comments
            </option>
            <option value={"created_at"} key={"created_at"}>
              Date
            </option>
          </select>
        </label>
        <label>
          Order
          <select onChange={handleOrderChange} value={filterOptions.order}>
            <option value={"asc"} key={"asc"}>
              Ascending
            </option>
            <option value={"desc"} key={"desc"}>
              Descending
            </option>
          </select>
        </label>
        <label>
            Articles Per Page
            <select onChange={handleLimitChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
        </label>
      </form>
      <section>
        <h2>Articles</h2>
        {allArticles.map((article) => {
          return (
            <>
            <Link to={`/article/${article.article_id}`} key={article.article_id}>
              <section key={article.article_id}>
                <h4>{article.title}</h4>
                <img
                  className="image-top3-topics"
                  src={article.article_img_url}
                ></img>
              </section>
            </Link>
            <button>{`Likes: ${article.votes}`}</button>
            </>
          );
        })}
      </section>
    </>
  );
};
