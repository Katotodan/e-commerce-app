import React, {useState} from 'react'
import "./leftmenu.css"
import { useNavigate } from "react-router";

export const LeftMenu = ({handleSubit}) => {
    let navigate = useNavigate();
    const [inputName, setInputName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const handleChange = (e)=>{
        switch (e.target.name) {
            case "inputName":
                setInputName(e.target.value)
                break;
            case "category":
                setCategory(e.target.value)
                break;
            case "price":
                setPrice(e.target.value)
                break;
            default:
                break;
        }
    } 
    const handleSubmit = (e) =>{
        e.preventDefault()
       let searchQuery = ""
       if (inputName) searchQuery = searchQuery + `productname=${inputName}`
       if (category){
        searchQuery == "" ? searchQuery = searchQuery + `category=${category}` : searchQuery = searchQuery + "&" + `category=${category}`
       } 
       if(price > 0){
        searchQuery == "" ? searchQuery = searchQuery + `price=${price}` : searchQuery = searchQuery + "&" + `price=${price}`
       } 
       navigate(`/search?${searchQuery}`);
    }
  return ( 
    <div className="left--menu">
            <form onSubmit={handleSubmit}>
                <h2>Filter by your preferences</h2>
                <div>
                    <label htmlFor="">Filter by product</label>
                    <input 
                    placeholder="Search item by name" 
                    className="left-search"
                    name='inputName'
                    value={inputName} onChange={handleChange} required/>

                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <input
                    placeholder="Category"
                    value={category}
                    name='category'
                    onChange={handleChange}
                />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input id="price" 
                    type="number" value={price} 
                    name='price'
                    className='price'
                    onChange={handleChange}/>
                </div>
                <button type="submit">Search</button>
            </form> 
        </div>
  )
}
