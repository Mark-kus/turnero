import React from 'react'
import DateCard from './DateCard'
import { workSans } from '../fonts'

const fakeDates = [
  'Monday 14, January',
  'Tuesday 15, January',
  'Wednesday 16, January',
  'Thursday 17, January',
  'Friday 18, January',
  'Saturday 19, January',
  'Sunday 20, January',
  'Monday 21, January',
  'Tuesday 22, January',
  'Wednesday 23, January',
  'Thursday 24, January',
  'Saturday 25, January',
  'Sunday 26, January',
  'Monday 27, January',
  'Tuesday 28, January',
  'Wednesday 29, January'
]

const DateList = () => {
  return (
    <ul className={`${workSans.className} w-full max-h-2xl overflow-y-auto`}>
      {fakeDates.map((date, index) => {
        return (
          <DateCard
            key={index}
            date={date}
          />
        )
      })}
    </ul>
  )
}

export default DateList
