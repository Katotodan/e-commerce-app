import React,{useState, createContext, useEffect} from "react";
import Header from "./Components/Navbar/Header";
import { LeftMenu } from "./Components/LeftMenu/LeftMenu";
import "./index.css"
import axios from 'axios'
import {Navigate, Outlet,  useNavigate, useLocation } from "react-router-dom"

// Cards context
export const CardContext = createContext(null);
export const ProductContext = createContext(null);
export const SearchContext = createContext(null);


export function App() {
  
  const [allProduct, setAllProduct] = useState([])
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [isSearch, setIsSearch] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() =>{ 
    const fecthData = () =>{
        axios.get('https://dummyjson.com/products')
        .then(res => {
            const data = res.data.products
            setProducts(data)  
            setAllProduct(data)
        })
        .catch(error => {
          console.error(error)
          setProducts(null)
        })
    }
    fecthData()
    
}, [])

useEffect(()=>{
  if(location.pathname === "/" && isSearch === false){
    setProducts(allProduct) 
    console.log(location)
  }else{
    setIsSearch(false)
  }
  
},[location])


  // I have to work on this search functionality later
  const submitFunc = (inputName,campany,price) => {
    // Redirect to home
    setIsSearch(true)
    // Change the product arr
    const regex = new RegExp(inputName, 'i');
    setProducts((prev) => allProduct.filter(el => regex.test(el["title"])))    
      
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
    <ProductContext.Provider value={{ products, setProducts}}>
      <CardContext.Provider value={{cards,setCards}}>
        <SearchContext.Provider value={{isSearch, setIsSearch}}>
          <main className="App" onClick={hidedropdown}>
            <Header/>
            <div className="main--container" >
              <div  data-dropdown="dropdown" className="left-container">
                <button className="search-btn" data-dropdown-button ="dropdown-button"> &#x1F50D; </button>
                <div> <LeftMenu handleSubit = {submitFunc}/> </div>
              </div>
              
              <div className="right-container" onClick={() => setIsSearch(false)}> 
                
                <Outlet/> 
              </div>
            </div> 
          </main>
        </SearchContext.Provider>
      </CardContext.Provider>
    </ProductContext.Provider>
  );
}


