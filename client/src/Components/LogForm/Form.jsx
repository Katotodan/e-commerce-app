import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./form.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const Form = ({title, submit, errorMsg, isLoading}) => {
    const [userCreditial, setUserCreditial] = useState({
        username: "",
        password: "",
        password2: ""
    })
    
    const handleChange = (e) =>{
        setUserCreditial({
            ...userCreditial,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className="log--form">
        <h1>Welcome to E-com</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            submit(userCreditial) 
        }}>
            <h2>{title}</h2>
            <p className="message">{errorMsg}</p>
            <div>
                <label htmlFor="email">Enter Username or email</label>
                <input type="text" id="email" value={userCreditial.username}  name="username" 
                placeholder="Username or email" onChange={handleChange} required/>
            </div> 
            <div>
                <label htmlFor="password">Enter Password</label>
                <input type="password" id="password" value={userCreditial.password} name="password"
                placeholder=" Password" onChange={handleChange} required/>
            </div>
            {title === "Log in" ? (
                <div> 
                    Don't have an account already? <Link to="../signup" className='link-btn'>Sing up</Link>
                </div>
            ):(
                <>
                <div>
                <label htmlFor="password">Confirm Password</label>
                <input id="password2" type="password" placeholder=" Confirm password" 
                value={userCreditial.password2} name="password2" onChange={handleChange}/>
                </div>
                <div>
                    Already with an account? <Link to="../login" className='link-btn'><span>Log in</span></Link>
                </div>
                </>
            )}

            <button type="submit">
                {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : title}
                
                
            </button>
        </form>
    </div>
            
  )
} 