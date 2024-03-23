import React from 'react'
import Image from 'next/image'
import Button from '../Button'

const PersonCard = () => {
  return (
    <div className='card card-side w-full rounded-none bg-slate-200'>
      <figure className='bg-slate-100'>
        <div className='bg-slate-200 border-2 border-base-300 w-40 h-40 rounded-lg m-2'></div>
      </figure>
      <div className='card-body py-2'>
        <h2 className='font-medium text-lg'>Robert California, 36</h2>
        <div className='text-xs'>
          <p>Health insurance: None</p>
          <p>Dentist: Extractions, Surgeries, Cleaning</p>
          <p>Location: San Francisco</p>
          <p>Available: Monday, Tuesday, Fridays</p>
        </div>
        <Button className={'btn-outline border-none bg-slate-100'}>Select</Button>
      </div>
    </div>
  )
}

export default PersonCard
