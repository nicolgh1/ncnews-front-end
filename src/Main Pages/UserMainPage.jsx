import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";

export const UserMainPage = () => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    return (
        <><h1>User Main Page</h1></>
    )
}