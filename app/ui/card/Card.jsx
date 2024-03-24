import React from 'react'

const Card = ({ slot }) => {
  return (
    <div className='card card-side w-full rounded-none bg-base-200'>
      {slot.left}
      <div className='card-body py-2 justify-center'>{slot.right}</div>
    </div>
  )
}

export default Card
