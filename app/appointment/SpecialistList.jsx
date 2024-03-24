import React from 'react'
import Card from '../ui/card/Card'
import CardSquaredImage from '../ui/card/CardSquaredImage'
import LinkButton from '../ui/LinkButton'
import CardInformation from '../ui/card/CardInformation'

const fakeInformation = {
  name: 'Robert California, 36',
  content: [
    { name: 'Health insurance', value: 'None' },
    { name: 'Dentist', value: 'Extractions, Surgeries, Cleaning' },
    { name: 'Location', value: 'San Francisco' },
    { name: 'Available', value: 'Monday, Tuesday, Fridays' }
  ]
}

const SpecialistList = () => {
  return (
    <section className='flex flex-col gap-4 overflow-y-auto w-full'>
      {[1, 2, 3, 4, 5].map((person, index) => {
        return (
          <Card
            key={index}
            slot={{
              left: <CardSquaredImage />,
              right: (
                <>
                  <CardInformation
                    title={fakeInformation.name}
                    content={fakeInformation.content}
                  />
                  <LinkButton
                    href={`/appointment/1`}
                    className={'w-full border-none'}>

                    Select
                  </LinkButton>
                </>
              )
            }}
          />
        )
      })}
    </section>
  )
}

export default SpecialistList
