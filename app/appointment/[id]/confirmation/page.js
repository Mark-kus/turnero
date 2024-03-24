import Button from '@/app/ui/Button'
import LinkButton from '@/app/ui/LinkButton'
import Card from '@/app/ui/card/Card'
import CardInformation from '@/app/ui/card/CardInformation'
import CardSquaredImage from '@/app/ui/card/CardSquaredImage'
import React from 'react'

const fakeAppointment = {
  specialist: {
    avatarUrl: 'https://avatar.com',
    name: 'Robert California',
    age: 36,
    insurance: null,
    specialty: 'Dentist',
    location: 'San Francisco',
    available: ['Mondays', 'Tuesdays', 'Fridays']
  },
  datetime: {
    date: 'Friday 18, January',
    time: 1600
  },
  patient: {
    avatarUrl: 'https://avatar.com',
    name: 'John Doe',
    age: 28,
    insurance: null,
    id: 123456789,
    phone: 1123456789,
    email: 'johndoe@gmail.com'
  }
}

const Confirmation = () => {
  const specialist = {
    name: `${fakeAppointment.specialist.name}, ${fakeAppointment.specialist.age}`,
    content: [
      { name: 'Health insurance', value: fakeAppointment.specialist.insurance },
      { name: 'Dentist', value: fakeAppointment.specialist.specialty },
      { name: 'Location', value: fakeAppointment.specialist.location },
      { name: 'Available', value: fakeAppointment.specialist.available.join(', ') }
    ]
  }
  const patient = {
    name: `${fakeAppointment.patient.name}, ${fakeAppointment.patient.age}`,
    content: [
      { name: 'ID', value: fakeAppointment.patient.id },
      { name: 'Health Insurance', value: fakeAppointment.patient.insurance },
      { name: 'Phone number', value: fakeAppointment.patient.phone },
      { name: 'Contact email', value: fakeAppointment.patient.email }
    ]
  }
  const [hours, minutes] = fakeAppointment.datetime.time.toString().match(/.{2}/g)
  return (
    <section className='w-1/2 flex flex-col items-start bg-neutral rounded-md p-8 mx-auto my-10'>
      <h1 className='text-2xl leading-none mb-4 mt-2'>Estás solicitando un turno con</h1>
      <div className='w-full'>
        <h2 className='mt-4 mb-2'>Dentist</h2>
        <Card
          slot={{
            left: <CardSquaredImage />,
            right: (
              <CardInformation
                title={specialist.name}
                content={specialist.content}
              />
            )
          }}
        />
      </div>
      <div className='w-full flex gap-4 mt-4'>
        <div className='w-full'>
          <h2 className='mb-2'>Date</h2>
          <div className='bg-base-200 w-full py-4 text-center text-sm'>{fakeAppointment.datetime.date}</div>
        </div>
        <div className='w-full'>
          <h2 className='mb-2'>Time</h2>
          <div className='bg-base-200 w-full py-4 text-center text-sm'>
            {hours}:{minutes}
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h2 className='mt-4 mb-2'>Patient</h2>
        <Card
          slot={{
            left: <CardSquaredImage />,
            right: (
              <>
                <CardInformation
                  title={patient.name}
                  content={patient.content}
                />
                <LinkButton
                  href={'/appointment'}
                  className='bg-transparent text-black border-2 border-base-300 hover:bg-base-300 hover:text-black'>
                  The appointment is for a family member
                </LinkButton>
              </>
            )
          }}
        />
      </div>
      <div className='flex justify-center gap-4 w-full mt-32'>
        <LinkButton
          href={`/appointment/1`}
          className={'btn-primary text-primary bg-white border-none w-full shrink'}>
          Go back
        </LinkButton>
        <Button className={' w-full shrink'}>Confirm appointment</Button>
      </div>
    </section>
  )
}

export default Confirmation
