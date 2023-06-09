import "../index.css"
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"


const Header =() =>{
    return(
        <nav>
            <div>Logo</div>
            <div className="nav--list">
                <li>Home</li>
                <li>Stock</li>
            </div>
            <div className="nav--btn">
                <button> <Link to="/login">Log in</Link></button>
                <button><Link to="/signin">Sign in</Link></button>
            </div>
        </nav>
    )
}

const LeftMenu =({handleSubit}) =>{
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
    return(
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

const Main = () =>{
    const [elmtList, setElmntList] = useState([])
    let newArray = []
    const [currentItem ,setCurrentItem] = useState(0)
    useEffect(() =>{
        fetch("http://localhost:8080/getallproducts")
        .then(res => res.json()) 
        .then(data => {
            data.forEach(element => {
               newArray.push(

               <div 
               key={element._id} 
               onClick={ () =>{
                setCurrentItem(element._id)
                divClicked(element._id)
                }}>
                    <Link to ={`/${element._id}`}>
                        <img src={element.images[0]} className="main--img" alt="Item picture" />
                        <p>{element.name}</p>
                        <br/>
                    </Link>
                    <span className="likebtn like">❤</span>
                    <span>13</span>
                    <span className="likebtn unlike">😡</span>
                    <span >0</span>
                 
               </div>) 
            })
        })
        .then(() =>{
            setElmntList(newArray)
            newArray = []
        })
        .catch(error => console.log(error))
    }, [])

    const divClicked = (id) =>{
        console.log(id)
        // I have to work here
    }
    return(
        <div className="right--main">
            {elmtList}
        </div>
    )
}

export{Header,LeftMenu, Main}