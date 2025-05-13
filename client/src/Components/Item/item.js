import {useEffect, useState, useContext} from "react"
import {useParams} from "react-router"
import {  } from "../../App"
import { ProductContext, CardContext} from "../../context"


import "./item.css"

export function Item(){
    const {id}= useParams()
    const {products} = useContext(ProductContext)
    const [product,setProduct] = useState([])
    const {setCards, cards} = useContext(CardContext);

    useEffect(()=>{
        setProduct(products.filter(el => el.id === id))        
    }, [])
    
    useEffect(()=>{
        // I don't have to fetch because I am using the product context now
    //    fetch(`http://localhost:8080/getproduct/${id}`) 
    //    .then(res => res.json())
    //    .then(data => {
            
    //    })
    
       setProduct(products.filter(el => el.id == id))
    }, [products])

    const addToCard = (e,item)=>{
        //Add this id inside the card context
        setCards(card => [{
            id: item.id,
            name: item.title,
            price: item.price,
        }, ...card])
        e.target.innerHTML = '✔'
        e.target.disabled = true
        e.target.style.cursor = "not-allowed"
        setTimeout(() => {
            e.target.innerHTML = 'Add it again'
            e.target.disabled = false
            e.target.style.cursor = "pointer" 
        }, 1000);
        
    }

    return(
      <div className="item-container">
          <div>
              <h2>{product[0]?.title}</h2>
              <img src={product[0]?.images[0]}/>
          </div>
          <div>
              <p><strong>Category</strong>: {product[0]?.category}</p><br/>
              <div className="price-container">
                  <div><strong>Price</strong>: {product[0]?.price}</div>
                  <div><strong>Rate</strong>: {product[0]?.rating}</div>
              </div>
              
              <p><strong>Description</strong>: {product[0]?.description}</p><br/>
          </div>
          <button onClick={(e) => addToCard(e,product[0])}>Add to Card</button>
      </div>
    )
}