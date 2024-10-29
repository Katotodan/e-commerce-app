import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isUserSignIn, setIsUserSignIn] = useState(true)
  return (
    <header>
        <div>
          <Link to="/"> <img src="logo.png" alt="E-commerce logo" /> </Link>
          
        </div>
        <button className='menu-icon' ><FontAwesomeIcon icon={faBars} /></button>
        
        <div className="dropdown-container">
            <nav>
              <ul> 
                <li> <Link to="/">Home</Link> </li>
                <li data-dropdown="dropdown" >
                  <button type='button'>
                    <img src="https://www.essent.com/SiteData/SiteID34/Images/B2B-Ecommerce/B2B%20Ecommerce%202%20Cart%20Y.png"
                    alt="Carts icone" data-dropdown-button ="dropdown-button"/>
                  </button>
                </li>
              </ul>
            </nav>
          <div data-dropdown="dropdown">
            {isUserSignIn ? (
              <>
              <button>
                <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
                alt="User Icon" data-dropdown-button ="dropdown-button"/>
              </button>
              <div> 
                <button className='log-btn'>
                <Link to="/login">Log out</Link>
                </button>
              </div> 
              </>
            
            ): <button className='logIn--btn'> <Link to="/login">Log in</Link></button>}
            
          </div>
        </div>
    </header>
  )
}

export default Header
