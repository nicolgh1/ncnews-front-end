import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";

export const PostArticle = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    return (
        <><h1>Post Article</h1></>
    )
}