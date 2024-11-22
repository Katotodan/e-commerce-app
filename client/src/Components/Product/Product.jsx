import React, {useState, useEffect, useContext} from 'react'

import { Link } from 'react-router-dom'
import "./product.css"
import { CardContext, ProductContext, SearchContext} from '../../context'

export const Product = () => {
    const [elmtList, setElmntList] = useState([])
    const {setCards} = useContext(CardContext);
    const {products} = useContext(ProductContext);
    const [startProduct, setStartProduct] = useState(0)
    const [endProduct, setEndProduct] = useState(10)
    const {isSearch, setIsSearch} = useContext(SearchContext)

    useEffect(()=>{
        setElmntList(products.slice(startProduct, endProduct))
    }, [products])

    useEffect(()=>{
        setElmntList(products.slice(startProduct, endProduct))
    }, [endProduct])
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
    }

    

    
    return(
        <div className="right--main">
            <h2 className="welcome--text">Welcome to our E-commerce</h2>
            {isSearch && <button onClick={viewAllProduct} className='back-btn'>Back</button>}
            <div className='flex-container'>
                {
                    elmtList.map((element) => (
                        <div key={element.id}>
                            <img src={element.images[0]} className="main--img" alt="Item picture" />
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
            
            {endProduct< products.length && <button className='readMore-btn' onClick={viewMore}>View more</button>}
        </div>
    )
}
