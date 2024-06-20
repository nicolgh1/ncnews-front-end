import { useState,useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { getTopics,postArticle } from "../Api";
import { Link } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { PostCompleted } from "../Components/PostCompleted";


export const PostArticle = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null)
  const [postedArticle, setPostedArticle] = useState({})
  const [postObj, setPostObj] = useState({
    title: "",
    topic: "",
    author: userDetails.username,
    body: "",
    article_img_url: ""
})
    if(Object.keys(userDetails).length===0){
    return (
        <Link to='/login'>Log In to publish an article</Link>
    )
  }

  useEffect(() => {
    if(Object.keys(userDetails).length===0) return;
    setTopics([]);
    getTopics()
      .then(({ topics }) => {
        const topicSlugs = topics.map((topic) => topic.slug);
        setTopics(topicSlugs);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  function handleTopicChange(e){
    setPostObj({...postObj, topic:e.target.value})
  }
  function handleTitleChange(e){
    setPostObj({...postObj, title:e.target.value})
  }
  function handleUrlChange(e){
    setPostObj({...postObj, article_img_url:e.target.value})
  }
  function handleBodyChange(e){
    setPostObj({...postObj, body:e.target.value})
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(postObj)
    postArticle(postObj).then((article)=>{
        console.log(article,'should have posted art')
        setPostedArticle(article)
    }).catch((err) => {
        console.log(err,'err in posting')
        setError(err);
    });
    
    }
   if(Object.keys(postedArticle).length >0) return (<PostCompleted article_id={postedArticle.article_id}/> )

  if(error) return (<ErrorPage error={error}/>)
  return (
    <>
      <h2>Hi {userDetails.name}, let's write an article</h2>
      <form>
        <label>
          Article Title:
          <input onChange={handleTitleChange}></input>
        </label>
        <label>
          Category:
          <select onChange={handleTopicChange}>
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
            Article Image URL:
            <input onChange={handleUrlChange}></input>
        </label>
        <label>
            Article Body:
            <input onChange={handleBodyChange}></input>
        </label>
        <button onClick={handleSubmit}>Publish</button>
      </form>
    </>
  );
};
