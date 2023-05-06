import React from "react";
import { Header, LeftMenu } from "../Components/main";
import "../index.css"

function NotFind() {
  
  return (
    <div className="App">
      <Header/>
      <div className="main--container">
        <LeftMenu/>
        <div className="not-find">
            <h2>Oop! Item not find 🤣😂😁</h2>
        </div>
      </div>
    </div>
  );
}

export default NotFind;
