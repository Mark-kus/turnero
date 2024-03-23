import Button from '@/app/ui/Button'
import DatePicker from '@/app/ui/date/DatePicker'
import HourPicker from '@/app/ui/hour/HourPicker'
import React from 'react'
import Link from 'next/link'

const AppointmentDatetime = () => {
  return (
    <main className='m-10 flex flex-col'>
      <h1 className='text-2xl mb-8'>Pick your appointment</h1>
      <div className='flex gap-4'>
        <DatePicker />
        <HourPicker />
      </div>
      <div className='self-end mt-4'>
        <Link
          href='/appointment'
          className='btn btn-primary btn-outline shadow-none rounded-xl w-80 h-10 min-h-10 font-medium border-none bg-primary-content bg-opacity-40 text-primary'>
          Go back
        </Link>
        <Button className={'border-none font-medium w-80 ml-4'}>Continue</Button>
      </div>
    </main>
  )
}

export default AppointmentDatetime
