import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./product.css"
import { CardContext } from '../../App'

const Product = () => {
    const [elmtList, setElmntList] = useState([])
    const [fetchError, setFetchError] = useState(false)
    const {setCards} = useContext(CardContext);
    const addToCard = (e,item)=>{
        
        
        //Add this id inside the card context
        setCards(card => [{
            id: item.id,
            name: item.brand,
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

    useEffect(() =>{ 
        axios.get('https://dummyjson.com/products')
        .then(res => {
            const data = res.data.products
            setElmntList(data)
            
        })
        .catch(error => {
            setFetchError(true)
            console.log(error)

        })
    }, [])

    
    return(
        <div className="right--main">
            {fetchError ? <div>Something whent wrong</div> : (
                elmtList.map((element) => (
                    <div key={element.id}>
                        <img src={element.images[0]} className="main--img" alt="Item picture" />
                        <h3>{element.brand}</h3>
                        <br />
                        {/* Desable like functionality */}
                        <div>
                            <div>${element.price}</div>
                            <div>
                                <div>
                                    <span className="likebtn like">❤</span>
                                    <span>13</span>
                                </div>
                                
                                <div>
                                    <span className="likebtn unlike">😡</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                       
                        <div>
                            <button type="button" onClick={(e) => addToCard(e,element)}>Add to card</button>
                            <button type="button" value={element.id}>View details</button>
                        </div>
                    </div> 
                ))
            
            ) }
        </div>
    )
}
export default Product
