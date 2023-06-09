import "../index.css"
const LogIn = () =>{
    return(
        <div className="log--form">
            <h1>Welcome to E-com</h1>
            <h2>Log In</h2>
            <form>
                <p className="message"></p>
                <div>
                    <label htmlFor="email">Enter User Name or email address</label>
                    <input type="text" id="email" placehold="Enter User Name or email address"/>
                </div>
                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" id="password" />
                </div>

                <button type="submit">Log In</button>
            </form>
            
        </div>
    )
}
export default LogIn