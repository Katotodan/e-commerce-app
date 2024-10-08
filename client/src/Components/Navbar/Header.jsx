import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./header.css"

const Header = () => {
  const [isUserSing, setIsUserSing] = useState(true)
  return (
    <header>
        <div>
          <Link to="/"> <img src="logo.png" alt="E-commerce logo" /> </Link>
          
        </div>
        <nav>
            <ul className="nav--list">
                <li> <Link to="/">Home</Link> </li>
                <li>Stock</li>
            </ul>
        </nav>
        <div className="nav--btn dropdown" data-dropdown="dropdown">
          {isUserSing ? (
            <>
            <button className='dropdown-btn'>
              <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
              alt="User Icon" data-dropdown-button ="dropdown-button"/>
            </button>
            <div> 
              <button>
              <Link to="/login">Log out</Link>
              </button>
            </div> 
            </>
            
          ): <button> <Link to="/login">Log in</Link></button>}
            
            
        </div>
    </header>
  )
}

export default Header
