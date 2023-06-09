import React,{useState} from "react";
import { Header, LeftMenu } from "./Components/main";
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
    <div className="App">
      <Header/>
      <div className="main--container">
        <LeftMenu handleSubit = {subitFunc}
        />
        <Outlet/>
      </div>
    </div>
  );
}

// Compliting log in and sign up functionality
export default App;
