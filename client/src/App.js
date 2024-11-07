import React,{useState, createContext} from "react";
import Header from "./Components/Navbar/Header";
import { LeftMenu } from "./Components/LeftMenu/LeftMenu";
import "./index.css"
import {Outlet,  useNavigate, useEffect} from "react-router-dom"

export const CardContext = createContext(null);
export function App() {
  // Cards context
  
  const [cards, setCards] = useState([]);
  const navigate = useNavigate()
  // I have to work on this search functionality later
  let url = ""
  const submitFunc = (inputName,campany,price) => {
    url = ""
    let hasAlreadyAquery = false
    
    if (inputName) {
      if(hasAlreadyAquery){
        url += "&" + "name=" + inputName
      }else{
        url += "name=" + inputName
        hasAlreadyAquery = !hasAlreadyAquery
      }
    }
    if (campany && campany !=="") {
      if(hasAlreadyAquery){
        url += "&" + "campany=" + campany
      }else{
        url += "campany=" + campany
        hasAlreadyAquery = !hasAlreadyAquery
      }
    }
    if (price && price !== 0) {
      if(hasAlreadyAquery){
        url += "&" + "price=" +price
      }else{
        url += "price=" +price
        hasAlreadyAquery = !hasAlreadyAquery
      }
      
    }
    navigate(`/view/item/${url}`)
  }

  const hidedropdown = (e) =>{
    const isDropdown = e.target.getAttribute('data-dropdown-button')
    
    if(!isDropdown && e.target.closest("[data-dropdown]") != null) return

    let currentDropdown
    if(isDropdown){
      currentDropdown = e.target.closest("[data-dropdown]");
      currentDropdown.classList.toggle("active")       
    }
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown =>{
      if(dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
  }
  
  return (
    <CardContext.Provider value={{cards,setCards}}>
    <main className="App" onClick={hidedropdown}>
      <Header/>
      <div className="main--container" >
        <div  data-dropdown="dropdown" className="left-container">
          <button className="search-btn" data-dropdown-button ="dropdown-button"> &#x1F50D; </button>
          <div> <LeftMenu handleSubit = {submitFunc}/> </div>
        </div>
        
        <div className="right-container"> 
          <h2 className="welcome--text">Welcome to our E-commerce</h2>
          <Outlet/> 
        </div>
      </div> 
    </main>
    </CardContext.Provider>
  );
}

