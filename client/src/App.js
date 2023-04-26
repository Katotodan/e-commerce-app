import React, {useEffect} from "react";
import { Header, LeftMenu, Main } from "./Components/main";
import "./index.css"

function App() {
  
  return (
    <div className="App">
      <Header/>
      <div className="main--container">
        <LeftMenu/>
        <Main/>
      </div>
    </div>
  );
}

// Start in main.js
export default App;
