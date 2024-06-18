import { useContext,useEffect,useState } from 'react'
import { UserContext } from "../UserContext";
import {useParams} from "react-router-dom"

export const ArticlePage = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const {article_id} = useParams()
    console.log(article_id)
    return (
        <><h1>Article Page</h1></>
        // {onClick={()=>{handleVotesClick(article.article_id)}}}
    )
}