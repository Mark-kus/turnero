import React from 'react'
import AppointmentForm from './Form'
import SpecialistList from './SpecialistList'

const Home = () => {
  return (
    <main className='flex justify-between gap-10 m-10'>
      <AppointmentForm />
      <SpecialistList />
    </main>
  )
}

export default Home
