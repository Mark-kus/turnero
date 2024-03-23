import React from 'react'
import Button from '../ui/Button'
import MinimalInput from '../ui/MinimalInput'
import DimmedLabel from '../ui/DimmedLabel'

const AppointmentForm = () => {
  return (
    <div className='hero bg-neutral'>
      <div className='hero-content'>
        <div className='max-w-md m-4'>
          <h1 className='text-2xl leading-3'>Pick your appointment</h1>
          <p className='py-6 text-xs'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo.
          </p>
          <div className='bg-gray-200 h-36 rounded-lg border-2 border-base-300'></div>
          <form>
            <label className='form-control w-full mt-4'>
              <DimmedLabel>Specialty</DimmedLabel>
              <MinimalInput />
            </label>
            <label className='form-control w-full mt-4'>
              <DimmedLabel>Doctor&apos;s name</DimmedLabel>
              <MinimalInput />
            </label>
            <label className='form-control w-full mt-4'>
              <DimmedLabel>Health insurance</DimmedLabel>
              <MinimalInput />
            </label>
            <Button className={'w-full min-h-8 h-8 text-xs font-medium mt-6'}>Label</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentForm
