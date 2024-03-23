import React from 'react'

const PasswordResetLayout = ({ children }) => {
  return (
    <section className='h-screen w-screen bg-neutral flex justify-center items-center'>
      <div className='border-2 border-base-300 bg-white p-16 text-center max-w-screen-sm'>{children}</div>
    </section>
  )
}

export default PasswordResetLayout
