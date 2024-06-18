import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";

export const LogIn = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    return (
        <><h1>Log IN</h1></>
    )
}