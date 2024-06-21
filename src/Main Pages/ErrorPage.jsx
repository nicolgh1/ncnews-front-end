import { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../UserContext";

export const ErrorPage = (error) => {
    const {userDetails,setUserDetails} = useContext(UserContext)
    if(error){
        if(error.error){
            return (<>
                <h2>Ops Something Went Wrong</h2>
                </>)
        }
        else {
            const msg = error.error.response.data.msg
            return (<>
                    <h1>{msg}</h1>
                    </>)
        }
     }
    else 
    return (
        <>
        <h1>Error Page</h1>
        <h3>Route Not Found</h3>
        </>
    )
}
