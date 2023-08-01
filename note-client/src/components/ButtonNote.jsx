import React from 'react'

const ButtonNote = ({text,...rest}) => {
  return (
    <button style={s} {...rest} >{text}</button>
  )
}

export default ButtonNote

const s={
  color:"white",
  'background-color':'darkolivegreen',
  'font-weight':'700',
  'padding':'0.5rem 1rem',
  'margin':'1rem 0',
  'border':'0',
  'border-radius':'3px',
  'outline':'none',
  'cursor':'pointer'
}



// background-color: darkolivegreen;
//         color: white;
//         font-weight: 700;
        
//         padding: .5rem 1rem;
//         margin: 1rem 0;
//         border-radius: 5px;
//         border: 0;
//         outline: none;
//         cursor: pointer;