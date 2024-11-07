import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CardContext } from '../../App';

const Header = () => {
  const [isUserSignIn, setIsUserSignIn] = useState(true)
  const {cards} = useContext(CardContext)
  return (
    <header>
        <div>
          <Link to="/"> <img src="logo.png" alt="E-commerce logo" /> </Link>
          
        </div>
        <div className="dropdown-container" data-dropdown="dropdown" >

          <button className='menu-icon' data-dropdown-button ="dropdown-button" >&#8801;</button>
        
          <div>
              <nav>
                <ul> 
                  <li> <Link to="/">Home</Link> </li>
                  <li >
                    <Link to="/card">
                    <button type='button'>
                      <img src="https://www.essent.com/SiteData/SiteID34/Images/B2B-Ecommerce/B2B%20Ecommerce%202%20Cart%20Y.png"
                      alt="Carts icone"/>  
                    </button>
                    {cards.length > 0 && <span className='items-number'>{cards.length}</span>}
                    </Link>
                  </li>
                </ul>
              </nav>
            <div >
              {isUserSignIn ? (
                <>
                <button>
                  <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
                  alt="User Icon"/>
                </button>
                <div> <Link to="/login" className='log-btn'>Log out</Link></div> 
                </>
              
              ): <Link to="/login" className='logIn--btn'>Log in</Link>}
              
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header
