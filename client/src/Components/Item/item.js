import {useEffect, useState, useContext, useRef} from "react"
import {useParams, Navigate} from "react-router-dom"
import {  } from "../../App"
import { ProductContext, CardContext, SearchContext} from "../../context"


import "./item.css"

export function Item(){
    const {id}= useParams()
    const {products} = useContext(ProductContext)
    const [product,setProduct] = useState([])
    const {setCards} = useContext(CardContext);
    // Navigation code when the search is true
    
    const {isSearch, setIsSearch} = useContext(SearchContext)
  const [navigateToHome, setNavigateToHome] = useState(false)
  const isFirstRender = useRef(true);

    useEffect(()=>{
        setProduct(products.filter(el => el.id === id))        
    }, [])

    

  useEffect(()=>{
    if (isFirstRender.current) {
      // Skip this effect on the first render
      isFirstRender.current = false;
      return;
    }else{
      if(isSearch){
        // Navigate to home page
        setNavigateToHome(true)
        
      }
    }
    

  }, [isSearch])
    
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
            e.target.innerHTML = 'Add again'
            e.target.disabled = false
            e.target.style.cursor = "pointer" 
        }, 1000);
        
    }

    return(
        <div className="item-container">
            {navigateToHome && <Navigate to="/"/>}
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