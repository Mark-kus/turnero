import React from 'react'
import Button from '../Button'

const DateCard = ({ date }) => {
  return (
    <li className='my-4'>
      <Button className={'btn-outline bg-primary-content bg-opacity-40 border-none text-primary w-full font-medium'}>
        {date}
      </Button>
    </li>
  )
}

export default DateCard
