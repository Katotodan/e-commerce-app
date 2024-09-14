import React,{useState} from "react";
import Header from "./Components/Navbar/Header";
import { LeftMenu } from "./Components/LeftMenu/LeftMenu";
import "./index.css"
import {Outlet,  useNavigate, useEffect} from "react-router-dom"

function App() {
  const navigate = useNavigate()
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
      console.log(currentDropdown);
      
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown =>{
      if(dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
    

  }
  
  return (
    <main className="App" onClick={hidedropdown}>
      <Header/>
      <div className="main--container" data-dropdown="dropdown">
        <button className="search-btn" data-dropdown-button ="dropdown-button"> &#x1F50D; </button>
        <div className="left-container"> <LeftMenu handleSubit = {submitFunc}/> </div>
        <div className="right-container"> <Outlet/> </div>
      </div> 
    </main>
  );
}

// Compliting log in and sign up functionality
export default App;
