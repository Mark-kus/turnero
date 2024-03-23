import React from 'react'
import PersonCard from '../ui/user/PersonCard'

const SpecialistList = () => {
  return (
    <div className='flex flex-col gap-4 overflow-y-auto max-h- w-full'>
      {[1, 2, 3, 4, 5].map((person, index) => {
        return <PersonCard key={index} />
      })}
    </div>
  )
}

export default SpecialistList
