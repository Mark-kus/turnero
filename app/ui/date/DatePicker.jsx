import React from 'react'
import DateList from './DateList'

const DatePicker = () => {
  return (
    <section className='w-2/3 max-w-md flex flex-col items-start bg-neutral rounded-md p-8'>
      <h2 className='text-2xl leading-none mb-4'>Seleccione una fecha</h2>
      <DateList />
    </section>
  )
}

export default DatePicker
