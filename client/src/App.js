import React,{useState, useEffect, useRef} from "react";
import Header from "./Components/Navbar/Header";
import { LeftMenu } from "./Components/LeftMenu/LeftMenu";
import "./app.css"
import axios from 'axios'
import {Navigate, Outlet, useSearchParams } from "react-router-dom"

// Cards context
import { CardContext,ProductContext, SearchContext, UserContext} from "./context";

export function App() {
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [isSearch, setIsSearch] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const leftMenu = useRef(null)
  const rightContent = useRef(null)
  const [viewSearchBtn, setViewSearchBtn] = useState(true)
  const isFirstRender = useRef(true)
  
  useEffect(() =>{ 
    const fecthData = () =>{
        axios.get('https://dummyjson.com/products')
        .then(res => {
            const data = res.data.products
            setProducts(data)  
        })
        .catch(error => {
          console.error(error)
          setProducts(null)
        })
    }
    fecthData()
    
  }, [])
  useEffect(() =>{
    if (isFirstRender.current) {
      // Check if the card session is already there
      if(sessionStorage.getItem('card')){
        setCards(JSON.parse(sessionStorage.getItem('card')))
      }
      isFirstRender.current = false; // Mark that it's no longer the first render
    } else {
      sessionStorage.setItem('card', JSON.stringify(cards))
    }
  }, [cards])

  const hidedropdown = (e) =>{
    const isDropdownBtn = e.target.getAttribute('data-dropdown-button')
    
    if(!isDropdownBtn && e.target.closest("[data-dropdown]") != null) return
    let currentDropdown
    if(isDropdownBtn){
      currentDropdown = e.target.closest("[data-dropdown]");
      currentDropdown.classList.toggle("active")       
    }
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown =>{
      if(dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
  }
  const hideLeftMenuOnSmallDivice = ()=>{
    const screenWidth = window.innerWidth
    if(screenWidth < 768) toggleLeftMenu()    
  }
  const toggleLeftMenu = ()=>{
    rightContent.current.classList.toggle("inactive")
    leftMenu.current.classList.toggle("inactive")
    rightContent.current.classList.toggle("active")
    leftMenu.current.classList.toggle("active")
    setViewSearchBtn(!viewSearchBtn)
  }
  
  
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo}}>
    <ProductContext.Provider value={{ products, setProducts}}>
      <CardContext.Provider value={{cards,setCards}}>
        <SearchContext.Provider value={{isSearch, setIsSearch}}>
          <main className="App" onClick={hidedropdown}>
            <Header/>
            <div className="main--container">
              {viewSearchBtn && <button className="search-btn" onClick={toggleLeftMenu}> &#x1F50D; </button>}
              {!viewSearchBtn && <button className="search-btn" onClick={toggleLeftMenu}> &#10060; </button>}
              <div className="left-container inactive" ref={leftMenu}>
                <LeftMenu hideLeftMenuOnSmallDivice={hideLeftMenuOnSmallDivice}/>
              </div>
              
              <div className="right-container active" ref={rightContent} onClick={() => setIsSearch(false)}> 
                
                <Outlet/> 
              </div>
            </div> 
          </main>
        </SearchContext.Provider>
      </CardContext.Provider>
    </ProductContext.Provider>
    </UserContext.Provider>
  );
}