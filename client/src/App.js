import React from "react";
import { Header, LeftMenu, Main } from "./Components/main";
import "./index.css"
import {Outlet} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
      <Header/>
      <div className="main--container">
        <LeftMenu/>
        <Outlet/>
      </div>
    </div>
  );
}

// Working on search functionnality and then buy
export default App;
