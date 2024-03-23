import React from 'react'
import Button from '../Button'

const HourCard = ({ hour }) => {
  const [hours, minutes] = hour.time.toString().match(/.{2}/g)
  return (
    <li className='w-full'>
      <Button
        className={'btn-outline bg-primary-content bg-opacity-40 h-20 border-none text-primary w-full font-medium'}
        disabled={hour.taken}>
        {hours}:{minutes}
      </Button>
    </li>
  )
}

export default HourCard
