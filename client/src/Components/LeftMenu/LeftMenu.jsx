import React, {useState} from 'react'
import "./leftmenu.css"

export const LeftMenu = ({handleSubit}) => {
    const [inputName, setInputName] = useState("")
    const [campany, setCampany] = useState("")
    const [price, setPrice] = useState(0)
    const handleChange = (e)=>{
        switch (e.target.name) {
            case "inputName":
                setInputName(e.target.value)
                break;
            case "campany":
                setCampany(e.target.value)
                
                break;
            case "price":
                setPrice(e.target.value)
                break;
            default:
                break;
        }
    } 
    const sub = (e) =>{
        e.preventDefault()
        handleSubit(inputName,campany,price)
        setInputName("")
        setCampany("")
        setPrice(0)
    }
  return (
    <div className="left--menu">
            <form onSubmit={sub}>
                <h2>Do you searching here</h2>
                <div>
                    <label htmlFor="">Search by name</label>
                    <input 
                    placeholder="Search by item name" 
                    className="left-search"
                    name='inputName'
                    value={inputName} onChange={handleChange}/>

                </div>
                <div>
                    <label htmlFor="">Campany name</label>
                    <input
                    placeholder="Campany"
                    value={campany}
                    name='campany'
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
