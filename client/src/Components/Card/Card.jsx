import React, {useContext, useEffect, useState, useRef} from 'react'
import { CardContext, SearchContext } from '../../context'
import "./card.css"
import { Navigate } from 'react-router-dom'
import { getUserLoader } from '../../loaders'
import { useNavigate } from "react-router"


export const Card = () => {
  const {cards, setCards} = useContext(CardContext)
  const {isSearch} = useContext(SearchContext)
  const [navigateToHome, setNavigateToHome] = useState(false)
  const isFirstRender = useRef(true)
  let navigate = useNavigate()

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

  let sum = 0;
  const deleteItem = (element) =>{
    const newCard = cards.filter(el => el != element)
    setCards(newCard)
  }
  const onBuy = async () =>{
    // If there is not a user, then redict to the log in page
    try {
      const user = await getUserLoader()
      if(user){
        // Navigate to buy
        navigate('/buy')
      }else{
        // Setting a variable that will notify on the login action that it should go to buy page.+
        sessionStorage.setItem("shouldBuy", true)
        navigate("/login")
      }
    } catch (error) {
      console.log(error.message)
    }
    
  }
  const itemList = cards.map((element, index)=>{
    sum = sum + element.price
    return(
      <div key={index} className='card'>
        <div>{index + 1}</div>
         <div>{element.name}</div>
         <div>${element.price}</div>
         <div><button title='remove' value={element.id} onClick={() =>deleteItem(element)}>X</button></div>
      </div>
    )
  })
  
  return (
    <div>
      {navigateToHome && <Navigate to="/"/>}
        <h2>Card contents</h2>
        {itemList.length > 0 ? (
          <div className='card-container'>
            <div className='card card-header'>
              <div>#</div>
              <div>Item</div>
              <div>Price</div>
              <div></div>
            </div>
            {itemList}
            <div className='total'>Total price is <strong>${sum.toFixed(2)}</strong> </div>
          </div>) : <h3 className='no-item'>No item in the card list</h3>}
        
        {itemList.length > 0 && <button className='buy-btn' onClick={onBuy}>Buy now</button>}
    </div>
  )
}
