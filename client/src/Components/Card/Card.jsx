import React from 'react'

export const Card = ({items}) => {
    const itemList = items.forEach((item, index) =><div key={index}>
        <span>{item.name}</span> <span>$ {item.price}</span>
    </div>)
  return (
    <div >
        <h2>Card contents</h2>
        {itemList ? itemList : "No item in the card"}
        {itemList && <button>Buy now</button>}
    </div>
  )
}

