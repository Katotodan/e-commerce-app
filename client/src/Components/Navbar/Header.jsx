import React, {useState, useContext, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import { useLoaderData } from "react-router"
import { CardContext } from '../../context';
import { useNavigate } from "react-router"


const Header = () => {
  const username = useLoaderData()
  const {cards} = useContext(CardContext)
  const dropdownContainer = useRef(null)
  const navigate = useNavigate()
  
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
    <nav>
        <div>
          <Link to="/"> <img src="logo.png" alt="E-commerce logo" /> </Link>
        </div>
        <div className="dropdown-container" data-dropdown="dropdown" ref={dropdownContainer}>
          <button className='menu-icon' data-dropdown-button ="dropdown-button" >&#8801;</button>
        
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
                <button>
                  <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
                  alt="User Icon"/>
                </button>
                <div> <button className='logIn--btn' onClick={logOut}>Log out</button></div> 
                </div>
              
              ): <button className='logIn--btn' onClick={login}>Log in</button>}
               
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Header
