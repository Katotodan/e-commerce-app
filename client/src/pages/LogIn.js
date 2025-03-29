import React,{useEffect, useState} from "react";
import { Form } from "../Components/LogForm/Form"
import axios from "axios"
import { useNavigate } from "react-router"
import { useLoaderData, Navigate  } from "react-router"



export const LogIn = () =>{
    let navigate = useNavigate() 
    let {status} = useLoaderData()
    
    const [errorMsg, setErrorMsg] = useState("")
    useEffect(()=>{
        if(status === 403) setErrorMsg("Session expired")
    }, [])

    const handleSubmition = (userCreditial) =>{  
        axios.post('http://localhost:8080/login', userCreditial, {
            withCredentials: true, // Send credentials (cookies)
            headers: {
              'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            }}).then(res => {
                let {token} = res.data;                
                // Save token and user
                sessionStorage.setItem("eCommerceToken", token)
                navigate("/")
            }).catch(err => {
                // Show error message
                err.response.data.message ? setErrorMsg(err.response.data.message) : setErrorMsg(err.message)    
                setTimeout(()=>{setErrorMsg("")}, 2000)
                console.error(err.message)
            })

    }

    if (status === 200) {
        return <Navigate to="/" replace />;
    }
    return(
        <Form title="Log in" submit={handleSubmition} errorMsg={errorMsg}/> 
    )
} 