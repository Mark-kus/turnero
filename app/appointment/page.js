import React from 'react'
import AppointmentForm from '../ui/forms/Appointment'
import SpecialistList from '../ui/SpecialistList'
import Modal from '../ui/modals/Confirmed'

const Home = () => {
  return (
    <main className='flex justify-between gap-10 m-10'>
      <AppointmentForm />
      <SpecialistList />
      <Modal />
    </main>
  )
}

export default Home
