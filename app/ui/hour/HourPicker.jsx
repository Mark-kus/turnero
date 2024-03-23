import React from 'react'
import HourList from './HourList'

const HourPicker = () => {
  return (
    <section className='w-full flex flex-col items-start bg-neutral rounded-md p-8'>
      <h2 className='text-2xl leading-none mb-4'>Seleccione un horario</h2>
      <HourList />
    </section>
  )
}

export default HourPicker
