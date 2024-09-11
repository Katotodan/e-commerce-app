import React from 'react'
import { Link } from 'react-router-dom'
import "./form.css"

export const Form = ({title, submit}) => {
  return (
    <div className="log--form">
        <h1>Welcome to E-com</h1>
        <form onSubmit={submit}>
            <h2>{title}</h2>
            <p className="message"></p>
            <div>
                <label htmlFor="email">Enter Username or email</label>
                <input type="text" id="email" placehold="Enter User Name or email address"/>
            </div>
            <div>
                <label htmlFor="password">Enter Password</label>
                <input type="password" id="password" />
            </div>
            {title === "Log in" ? (
                <div> 
                    Don't have an account already? <Link to="../signup" className='link'>Sing up</Link>
                </div>
            ):(
                <>
                <div>
                <label htmlFor="password">User Password</label>
                <input id="password" type="password" placeholder="Password"/>
                </div>
                <div>
                    Already with an account? <Link to="../login" className='link'><span>Log in</span></Link>
                </div>
                </>
            )}

            <button type="submit">{title}</button>
        </form>
    </div>
            
  )
}

