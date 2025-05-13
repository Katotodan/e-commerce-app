import React, {useContext} from 'react'
import "./buypage.css"
import { useNavigate } from 'react-router'
import { CardContext } from '../../context'

export const Buypage = () => {
    let navigate = useNavigate()
    const {setCards} = useContext(CardContext)

    const goBack = () =>{
        // Clear the card and navigate back to home page
        navigate('/')
        setCards([])
    }
  return (
    <div>
      <h4 className='welcoming-title'>Thank you for going this far 😊😉 <br/> but this is an exprerimental 
      feature, you can not buy</h4>
      <button className='link back-link' onClick={goBack}>Back</button>
    </div>
  )
}