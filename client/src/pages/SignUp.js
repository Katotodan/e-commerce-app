import React, {useState} from "react"
import { Form } from "../Components/LogForm/Form"
import axios from "axios"
import { useNavigate } from "react-router"

export const SignIn = () =>{
    const navigate = useNavigate() 
    const [errorMsg, setErrorMsg] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    const handleSubmition = (userCreditial) =>{
        setIsLogin(true)
        if(userCreditial.password != userCreditial.password2){
            setErrorMsg("Passwords should be identical.")
            setTimeout(()=>{setErrorMsg("")}, 2000)
            setIsLogin(false)    
        }else{
            axios.post(`${process.env.REACT_APP_API_UR}/signup`, userCreditial, {
                withCredentials: true, // Send credentials (cookies)
                headers: {
                    'Content-Type': 'application/json',
                }}).then(res => {
                    let {token} = res.data;                
                    // Save token and user
                    sessionStorage.setItem("eCommerceToken", token)
                    setIsLogin(false)
                    navigate("/")
                }).catch(err => {
                    // Show error message
                    err.response?.data.message ? setErrorMsg(err.response.data.message) : setErrorMsg(err.message)
                    setTimeout(()=>{setErrorMsg("")}, 2000)
                    setIsLogin(false)    
                }
            )
        }
        
    }
    return(
        <Form title="Sing up" submit={handleSubmition} errorMsg={errorMsg} isLoading = {isLogin}/>
    )
}