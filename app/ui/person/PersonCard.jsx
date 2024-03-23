import React from 'react'
import Image from 'next/image'
import LinkButton from '../LinkButton'

const PersonCard = () => {
  return (
    <div className='card card-side w-full rounded-none bg-neutral'>
      <figure className='bg-white bg-opacity-30'>
        <div className='bg-base-200 border-2 border-base-300 w-40 h-40 rounded-lg m-2'></div>
      </figure>
      <div className='card-body py-2 justify-center'>
        <h2 className='font-medium'>Robert California, 36</h2>
        <div className='text-xs'>
          <p>Health insurance: None</p>
          <p>Dentist: Extractions, Surgeries, Cleaning</p>
          <p>Location: San Francisco</p>
          <p>Available: Monday, Tuesday, Fridays</p>
        </div>
        <LinkButton
          href={`/appointment/1`}
          className={'w-full'}>
          Select
        </LinkButton>
      </div>
    </div>
  )
}

export default PersonCard
