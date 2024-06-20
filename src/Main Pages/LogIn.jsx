import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from 'react-router-dom';
import {getUserById} from '../Api'

export const LogIn = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    const [inputUsername, setInputUsername] = useState("");
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    function handleInputChange(e){
        setInputUsername(e.target.value)
    }
    function handleLogIn(){
        getUserById(inputUsername).then(({user})=>{
            setUserDetails(user)
            navigate('/user-page')
        }).catch((err)=>{
            setError(err)
        })
    }

    if(error){
        return (
            <>
            <h1>{error.response.data.msg}</h1>
            </>
        )
    } else {
        return (
            <>
            <h1>Log IN</h1>
            <label>
                Username 
                <input onChange={handleInputChange}></input>
                <p>Use weegembump as test Username</p>
            </label>
            <button onClick={handleLogIn}>Log In</button>
            </>
        ) 
    }
}