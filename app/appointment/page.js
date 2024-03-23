import React from 'react'
import AppointmentForm from './Form'
import SpecialistList from '../ui/person/PersonList'

const Home = () => {
  return (
    <main className='flex justify-between max-h-2xl gap-10 m-10'>
      <AppointmentForm />
      <SpecialistList />
    </main>
  )
}

export default Home
