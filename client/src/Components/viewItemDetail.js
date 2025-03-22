import {useParams, Link} from "react-router"
import { useEffect, useState } from "react"
 
export const ViewItemDetail = () =>{
    const {params} = useParams()
    console.log(params)
    const [elmtList, setElmntList] = useState([])
    let newArray = []
    const [currentItem ,setCurrentItem] = useState(0)
    useEffect(() =>{
        fetch(`http://localhost:8080/getproduct?${params}`)
        .then(res => res.json()) 
        .then(data => {
            data.forEach(element => {
               newArray.push( 
               <div 
                key={element._id} 
                onClick={ () =>{
                // setCurrentItem(element._id)
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
    }, [params])

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
// This notation is wrong, it is not the viewItemDetail component. Add space at the 
// End of view component element, figure it out why the left search is not containing the
// hold screen on small screen