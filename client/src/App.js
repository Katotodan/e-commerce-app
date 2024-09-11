import React,{useState} from "react";
import Header from "./Components/Navbar/Header";
import { LeftMenu } from "./Components/Navbar/LeftMenu";
import "./index.css"
import {Outlet,  useNavigate, useEffect} from "react-router-dom"

function App() {
  const navigate = useNavigate()
  let url = ""
  const subitFunc = (e,inputName,campany,price) => {
    e.preventDefault()
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
  
  return (
    <main className="App">
      <Header/>
      <div className="main--container">
        <LeftMenu handleSubit = {subitFunc}
        />
        <Outlet/>
      </div> 
    </main>
  );
}

// Compliting log in and sign up functionality
export default App;
