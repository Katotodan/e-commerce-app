import React, {useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom'
import "./product.css"
import { CardContext, ProductContext} from '../../context'
import { useSearchParams, useNavigate } from "react-router";

export const Product = () => {
    let navigate = useNavigate();
    const [elmtList, setElmntList] = useState([])
    const {setCards} = useContext(CardContext)
    const {products} = useContext(ProductContext)
    const [endProduct, setEndProduct] = useState(10)
    const [isSearch, setIsSearch] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const startProduct= 0

    useEffect(()=>{
        setElmntList(products.slice(startProduct, endProduct))
    }, [products])

    useEffect(()=>{
        setElmntList(products.slice(startProduct, endProduct))
    }, [endProduct])

    useEffect(()=>{
        const productName = searchParams.get("productname")
        const productCategory = searchParams.get("category")
        const productPrice = searchParams.get("price")
        if(productName || productCategory || productPrice){
            setIsSearch(true)
            let foundItem = []
            for (let item of products){
                // Does item has the product title including the passing one?
                if(productName){
                    const productRegex = new RegExp(productName, "i")
                    if(item.title.search(productRegex) !== -1){                        
                        foundItem.push(item)
                    }
                }
                // Does it have the category passed in
                else if(productCategory) {
                    const categoryRegex = new RegExp(productCategory, "i")
                    if(item.category.search(categoryRegex) !== -1){
                        foundItem.push(item)
                    }
                }
                // Does it have the price passed in?
                else if(productPrice){
                    if(item.price === productPrice){
                        foundItem.push(item)
                    }
                }else{
                    return
                }
                    
            }
            setElmntList(foundItem)            
        }else{
            setIsSearch(false)
            setElmntList(products.slice(startProduct, endProduct))
        }
        
        
    },[searchParams,products])
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
    const viewMore = ()=>{
        const productLength = products.length;
        if(endProduct + 5 <= productLength){
            setEndProduct(prev => prev + 5)
        }else{
            setEndProduct(productLength)
        }
    }
    const viewAllProduct = ()=>{
        setIsSearch(false)
        setElmntList(products.slice(startProduct, endProduct))
        navigate("/")
    }
    
    return(
        <div className="right--main">
            <h2 className="welcome--text">Welcome to our E-commerce</h2>
            {isSearch && <button onClick={viewAllProduct} className='back-btn'>Clear Filter</button>}
            <div className='flex-container'>
                {
                    elmtList.map((element) => (
                        <div key={element.id}>
                            <div className='img-container'>
                            <img src={element.images[0]} className="main--img" alt={element.title +"picture"} 
                                loading='lazy' 
                                onLoad={(e) => e.target.parentElement.classList.add("loaded")}/>
                            </div>
                            
                            <h3>{element.title}</h3>
                            <br /> 
                            {/* Desable like functionality */}
                            <div>
                                <div><strong>Price</strong>: ${element.price}</div>
                                <div><strong>Rate</strong>: {element.rating}</div>
                            </div>
                        
                            <div>
                                <button type="button" onClick={(e) => addToCard(e,element)}>Add to card</button>
                                <button type="button">
                                    <Link to={`/${element.id}`} className='link'>View details</Link>
                                </button>
                            </div>
                        </div> 
                    ))
                }

            </div>
            {endProduct < products.length && !isSearch && <button className='readMore-btn' onClick={viewMore}>View more</button>}
            
        </div>
    )
}
