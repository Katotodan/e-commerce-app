import "../index.css"
const SignIn = () =>{

    return(
        <div className="log--form">
            <h1>Welcome to E-com</h1>
            <h2>Sing Up</h2>
            <form>
                <p className="message"></p>
                <div>
                    <label htmlFor="userName">User name</label>
                    <input id="userName" type="text" placeholder="User Name"/>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="text" placeholder="Email"/>
                </div>
                <div>
                    <label htmlFor="password">User Password</label>
                    <input id="password" type="password" placeholder="Password"/>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn