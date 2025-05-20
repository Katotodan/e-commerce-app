import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import "./Navbar/header.css"
import { useLoaderData } from "react-router"
import { useNavigate } from "react-router"


export function NotFind() {
  const username = useLoaderData()
  const dropdownContainer = useRef(null)
  const navigate = useNavigate() 
  const cards = JSON.parse(sessionStorage.getItem('card'))

  const hideDropDown = () =>{
    if(dropdownContainer) dropdownContainer.current.classList.toggle("active")
  }
  const login = () =>{
    hideDropDown()
    navigate("/login")
  }
  const logOut = () =>{
    hideDropDown()
    // Remove token and user
    sessionStorage.removeItem("eCommerceToken")
    navigate("/login")
  }
  
  return (
  <>
    <nav>
        <div>
          <Link to="/"> <img src="logo.png" alt="E-commerce logo" /> </Link>
        </div>
        <div className="dropdown-container" data-dropdown="dropdown" ref={dropdownContainer}>
          <button className='menu-icon' data-dropdown-button ="dropdown-button">&#8801;</button>
        
          <div>
            <ul> 
              <li> <Link to="/" className='link' onClick={hideDropDown}>Home</Link> </li>
              <li >
                <Link to="/card" onClick={hideDropDown}>
                <button type='button'>
                  <img src="https://www.essent.com/SiteData/SiteID34/Images/B2B-Ecommerce/B2B%20Ecommerce%202%20Cart%20Y.png"
                  alt="Carts icone"/>  
                </button>
                {cards.length > 0 && <span className='items-number'>{cards.length}</span>}
                </Link>
              </li>
            </ul>
              
            <div >
              {username ? (
                <div className='logout-container'>
                  <span className='username'>{username.substring(0, 2).toUpperCase()}</span>
                
                  <div> <button className='logIn--btn' onClick={logOut}>Log out</button></div> 
                </div>
              
              ): <button className='logIn--btn' onClick={login}>Log in</button>}
               
            </div>
          </div>
        </div>
      </nav>
   <p className='not-found-paragraph'>404 Page not found</p>
  </>
  )
}