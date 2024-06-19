import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { getAllArticles, getTopics } from "../Api";
import { Link, useNavigate} from "react-router-dom";

export const Search = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    topic: "",
    sort_by: "votes",
    order: "desc",
    limit: 10,
  });
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    setAllArticles([]);
    if(filterOptions.topic==='all' || filterOptions.topic==='' ){
        delete filterOptions.topic
    }
    getAllArticles(filterOptions).then(({ articles }) => {
      setLoading(false);
      setAllArticles(articles);
    });
  }, [filterOptions]);

  useEffect(() => {
    setTopics([]);
    getTopics().then(({ topics }) => {
      const topicSlugs = topics.map((topic) => topic.slug);
      setTopics(topicSlugs);
    });
  }, [filterOptions]);

  function handleTopicChange(e) {
    setFilterOptions((curr) => {
      return { ...curr, topic: e.target.value };
    });
    navigate(`/search/${e.target.value}`)
  }
  function handleSortByChange(e) {
    setFilterOptions((curr) => {
      return { ...curr, sort_by: e.target.value };
    });
  }
  function handleOrderChange(e) {
    setFilterOptions((curr) => {
      return { ...curr, order: e.target.value };
    });
  }
  function handleLimitChange(e){
    setFilterOptions((curr) => {
        return { ...curr, limit: e.target.value };
      });
  }

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
              Popularity
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
            <Link to={`/article/${article.article_id}`}>
              <div key={article.article_id}>
                <h4>{article.title}</h4>
                <img
                  className="image-top3-topics"
                  src={article.article_img_url}
                ></img>
                <button>{`Likes: ${article.votes}`}</button>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};
