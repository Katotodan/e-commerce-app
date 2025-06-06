import React,{useEffect, useState} from "react";
import { Form } from "../Components/LogForm/Form"
import axios from "axios"
import { useNavigate } from "react-router"
import { useLoaderData, Navigate  } from "react-router"

export const LogIn = () =>{
    const navigate = useNavigate() 
    let {status} = useLoaderData()
    const [errorMsg, setErrorMsg] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    useEffect(()=>{
        if(status === 403) setErrorMsg("Session expired")
    }, [])

    const handleSubmition = (userCreditial) =>{  
        setIsLogin(true)
        axios.post(`${process.env.REACT_APP_API_UR}/login`, userCreditial, {
            withCredentials: true, // Send credentials (cookies)
            headers: {
              'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            }}).then(res => {
                let {token} = res.data;                
                // Save token and user
                sessionStorage.setItem("eCommerceToken", token)
                setIsLogin(false)
                // Test if we should redirect to the buy page or not
                const shouldBuy = sessionStorage.getItem("shouldBuy")                
                if(shouldBuy !== 'false'){
                    // Redict to buying page
                    sessionStorage.setItem("shouldBuy", 'false')
                    navigate('/card')
                }else{
                    navigate("/")
                }
            }).catch(err => {
                // Show error message
                err.response?.data.message ? setErrorMsg(err.response.data.message) : setErrorMsg(err.message)    
                setTimeout(()=>{setErrorMsg("")}, 2000)
                setIsLogin(false)
            }
        )
        
    }

    if (status === 200) {
        return <Navigate to="/" replace />;
    }
    return(
        <Form title="Log in" submit={handleSubmition} errorMsg={errorMsg} isLoading = {isLogin}/> 
    )
} 