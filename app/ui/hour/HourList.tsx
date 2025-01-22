import React from 'react'
import HourCard from './HourCard'

const fakeHours = {
  morning: [
    { time: 1000, taken: false },
    { time: 1030, taken: false },
    { time: 1100, taken: true },
    { time: 1130, taken: false },
    { time: 1200, taken: false }
  ],
  afternoon: [
    { time: 1400, taken: false },
    { time: 1430, taken: true },
    { time: 1500, taken: false },
    { time: 1530, taken: false },
    { time: 1600, taken: true },
    { time: 1630, taken: false },
    { time: 1700, taken: false },
    { time: 1730, taken: true },
    { time: 1800, taken: true },
    { time: 1830, taken: false },
    { time: 1900, taken: false },
    { time: 1930, taken: true },
    { time: 2000, taken: false },
    { time: 2030, taken: false },
    { time: 2100, taken: false }
  ]
}

const HourList = () => {
  return (
    <div className='w-full max-h-2xl overflow-y-auto'>
      <div className='w-full'>
        <h4 className='mb-2 mt-2'>Morning</h4>
        <ul className='columns-3 space-y-4'>
          {fakeHours.morning.map((hour, index) => {
            return (
              <HourCard
                key={index}
                hour={hour}
              />
            )
          })}
        </ul>
      </div>
      <div className='w-full'>
        <h4 className='mb-2 mt-6'>Afternoon</h4>
        <ul className='columns-3 space-y-4'>
          {fakeHours.afternoon.map((hour, index) => {
            return (
              <HourCard
                key={index}
                hour={hour}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default HourList
