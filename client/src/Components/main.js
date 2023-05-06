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
                <button>Log in</button>
                <button>Sign in</button>
            </div>
        </nav>
    )
}

const LeftMenu =() =>{
    return(
        <div className="left--menu">
            <input placeholder="Search by item name" className="left-search"/>
            <h4>Category</h4>
            <select>
                <option>All</option>
                <option>Rooms</option>
                <option>Mobile</option>
                <option>I.T</option>
                <option>Mecanic</option>
            </select>
            <h4>Company</h4>
            <select>
                <option>All</option>
                <option>Nokia</option>
                <option>Samsung</option>
                <option>Tecno</option>
                <option>Alibaba</option>
            </select>
            <div>
                <label htmlFor="price">Price:</label>
                <input id="price" type="number"/>
            </div>
            <button>Search</button>
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