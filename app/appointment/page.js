import React from 'react'
import AppointmentForm from './Form'
import SpecialistList from './SpecialistList'
import Modal from '../ui/modal/Modal'

const Home = () => {
  return (
    <main className='flex justify-between max-h-2xl gap-10 m-10'>
      <AppointmentForm />
      <SpecialistList />
      <Modal />
    </main>
  )
}

export default Home
