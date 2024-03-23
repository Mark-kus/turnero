import Button from '@/app/ui/Button'
import DatePicker from '@/app/ui/date/DatePicker'
import HourPicker from '@/app/ui/hour/HourPicker'
import React from 'react'
import Link from 'next/link'
import LinkButton from '@/app/ui/LinkButton'

const AppointmentDatetime = () => {
  return (
    <main className='m-10 flex flex-col'>
      <h1 className='text-2xl mb-8'>Pick your appointment</h1>
      <div className='flex gap-4'>
        <DatePicker />
        <HourPicker />
      </div>
      <div className='self-end mt-4'>
        <LinkButton
          className={'w-80'}
          href='/appointment'>
          Go back
        </LinkButton>
        <Button className={'border-none font-medium w-80 ml-4'}>Continue</Button>
      </div>
    </main>
  )
}

export default AppointmentDatetime
