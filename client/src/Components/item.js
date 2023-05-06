import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

export default function Item(){
    const {id}= useParams()
    const [elementNode, setElementNode] = useState("")
    useEffect(()=>{
       fetch("http://localhost:8080/getproduct?id="+id) 
       .then(res => res.json())
       .then(data => {
            const [elements] = data
            setElementNode(
                <div className="item-main-div">
                    <div>
                        <h2>{elements.name}</h2>
                        <img src={elements.images[0]}/>
                    </div>
                    <div>
                        <p>Company: {elements.company}</p><br/>
                        <span className="like-span">Price: {elements.price}</span>
                        <span>Rate: {elements.rate}</span>
                    </div>
                    <button>Buy Now</button>
                </div>
            )
       })
    })
    return(
        <div>
            {elementNode}
        </div>
    )
}