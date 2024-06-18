import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


export const Header = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const navigate = useNavigate();

    function handleLogInClick(){
        if(userDetails.username){
            return navigate('/:username')
        } else return navigate('/login')
    }
    function handleHomeClick(){
        if(userDetails.username){
            return navigate('home/:username')
        } else return navigate('/')
    }
    return (
        <section className='header'>
        <button onClick={handleHomeClick}>Home</button>
        <h1>NC News</h1>
        <button onClick = {handleLogInClick}>{(userDetails.username) ? userDetails.username : 'Log In' }</button>
        </section>
    )
}