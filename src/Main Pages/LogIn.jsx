import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';
import {getUserById} from '../Api'

export const LogIn = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const [inputUsername, setInputUsername] = useState("");
    function handleInputChange(e){
        setInputUsername(e.target.value)
    }
    function handleLogIn(){
        getUserById(inputUsername).then(({user})=>{
            setUserDetails(user)
        })
    }
    console.log(inputUsername,'input')
    return (
        <>
        <h1>Log IN</h1>
        <label>
            Username 
            <input onChange={handleInputChange}></input>
        </label>
        <Link to = '/user-page'>
        <button onClick={handleLogIn}>Log In</button>
        </Link>
        </>
    )
}