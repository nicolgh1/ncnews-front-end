import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Search } from './Search';
import { Link, useNavigate } from 'react-router-dom';

export const UserMainPage = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const navigate = useNavigate()
    function handleLogOutClick(){
        setUserDetails({})
        navigate('/')
    }
    return (
        <section className='user-page'>
        <h2>Welcome {userDetails.name}</h2>
        <img className='user-page-image' src={userDetails.avatar_url}></img>
        <button onClick={handleLogOutClick}>Log Out</button>
        <Link to='/post-article'>
        <button>Post An Article</button>
        </Link>
        <Search/>
        </section>
    )
}