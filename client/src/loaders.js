import axios from "axios"

export const loaderOnLogIn = async ()=>{
    try {
        // Test if user has already log in
        const token = sessionStorage.getItem("eCommerceToken")
        
        if(token){
            const response = await axios.get('http://localhost:8080/user', {
                withCredentials: true, // Send credentials (cookies)
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`, // Include the session token in the Authorization header
                }}
            )
            return {status: response.status}
            
        }else{
            // Return the log in page
            return {status: 404}
        }
        
    } catch (error) {        
        return {status: 404}
    }
}
export const getUserLoader = async () =>{
    try {
        // Test if user has already log in
        const token = sessionStorage.getItem("eCommerceToken")
        
        if(token){
            const response = await axios.get('http://localhost:8080/user', {
                withCredentials: true, // Send credentials (cookies)
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`, // Include the session token in the Authorization header
                }}
            )
            return response.data.user.username
            
        }else{
            // Return the log in page
            return undefined 
        }
        
    } catch (error) {        
        return undefined
    }
}