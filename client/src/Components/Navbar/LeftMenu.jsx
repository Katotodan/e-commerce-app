import React, {useState} from 'react'

export const LeftMenu = ({handleSubit}) => {
    const [inputName, setInputName] = useState("")
    const [campany, setCampany] = useState("")
    const [price, setPrice] = useState(0)
    const handleChange = (e,second)=>{
        switch (second) {
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
  return (
    <div className="left--menu">
            <form 
            onSubmit={
                (e) =>{
                    handleSubit(e,inputName,campany,price)
                } 
            }
            >
                <input 
                placeholder="Search by item name" 
                className="left-search"
                value={inputName} onChange={(e) =>handleChange(e,"inputName")}/>
                <h4>Campany</h4>
                <input
                  placeholder="Campany"
                  value={campany}
                  onChange={(e) =>handleChange(e,"campany")}
                />
                <div>
                    <label htmlFor="price">Price:</label>
                    <input id="price" 
                    type="number" value={price} 
                    onChange={(e) =>handleChange(e,"price")}/>
                </div>
                <button type="submit">Search</button>
            </form> 
        </div>
  )
}