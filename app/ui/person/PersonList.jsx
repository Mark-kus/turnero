import React from 'react'
import PersonCard from './PersonCard'

const SpecialistList = () => {
  return (
    <section className='flex flex-col gap-4 overflow-y-auto w-full'>
      {[1, 2, 3, 4, 5].map((person, index) => {
        return <PersonCard key={index} />
      })}
    </section>
  )
}

export default SpecialistList
