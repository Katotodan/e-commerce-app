import {useContext} from "react"
import { Form } from "../Components/LogForm/Form"
import axios from "axios"
import { UserContext } from "../context"

export const LogIn = () =>{
    const {userInfo, setUserInfo} = useContext(UserContext)

    const handleSubmition = (userCreditial) =>{        
        axios.post('http://localhost:8080/login', userCreditial, {
            withCredentials: true, // Send credentials (cookies)
            headers: {
              'Content-Type': 'application/json',
            //   Authorization: `Bearer ${sessionToken}`, // Include the session token in the Authorization header
            }}).then(res => {
                let {user, token} = res.data;
                // Save token and user
                localStorage.set("token", token)
                setUserInfo(user)
            }).then(() => console.log(UserContext) 
                

            ).catch(err => console.error(err.message))

    }
    return(
        <Form title="Log in" submit={handleSubmition}/> 
    )
}

// Finishing with the auth, and style the card
 