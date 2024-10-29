import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./product.css"

const Product = () => {
    const [elmtList, setElmntList] = useState([])
    const [fetchError, setFetchError] = useState(false)

    useEffect(() =>{
        axios.get('https://dummyjson.com/products')
        .then(res => {
            const data = res.data.products
            setElmntList(data.map(element => {
                return (
                <div        
                    key={element.id} 
                    // onClick={ () =>{
                    // setCurrentItem(element.id)
                    // divClicked(element.id)
                    // }}
                    >
                    <Link to ={`/${element.id}`}>
                        <img src={element.images[0]} className="main--img" alt="Item picture" />
                        <p>{element.brand}</p>
                        <br/>
                    </Link>
                    <span className="likebtn like">❤</span>
                    <span>13</span>
                    <span className="likebtn unlike">😡</span>
                    <span >0</span>
                </div>
                )
            }) )
        })
        .catch(error => {
            setFetchError(true)
            console.log(error)

        })
    }, [])

    const divClicked = (id) =>{
        console.log(id)
        // I have to work here
    }
    
    return(
        <div className="right--main">
            {fetchError ? <div>Something whent wrong</div> : elmtList }
        </div>
    )
}
export default Product
