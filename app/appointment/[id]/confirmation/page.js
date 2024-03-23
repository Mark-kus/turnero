import Button from '@/app/ui/Button'
import LinkButton from '@/app/ui/LinkButton'
import React from 'react'

const Confirmation = () => {
  return (
    <section className='w-full flex flex-col items-start bg-neutral rounded-md p-8'>
      <h1 className='text-2xl leading-none mb-4'>Estás solicitando un turno con</h1>
      <div>
        <h2>Dentist</h2>
      </div>
      <div>
        <div>
          <h2>Date</h2>
        </div>
        <div>
          <h2>Time</h2>
        </div>
      </div>
      <div>
        <h2>Patient</h2>
      </div>
      <div>
        <LinkButton href={`/appointment/1`}>Go back</LinkButton>
        <Button>Confirm appointment</Button>
      </div>
    </section>
  )
}

export default Confirmation
