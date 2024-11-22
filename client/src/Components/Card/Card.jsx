import React, {useContext, useEffect, useState, useRef} from 'react'
import { CardContext, SearchContext } from '../../context'
import "./card.css"
import { Navigate } from 'react-router-dom'


export const Card = () => {
  const {cards, setCards} = useContext(CardContext)
  const {isSearch, setIsSearch} = useContext(SearchContext)
  const [navigateToHome, setNavigateToHome] = useState(false)
  const isFirstRender = useRef(true);

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
        
        {itemList.length > 0 && <button className='buy-btn'>Buy now</button>}
    </div>
  )
}

// Styling the card and make it a todo list

