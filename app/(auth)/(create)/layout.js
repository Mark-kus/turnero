import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='bg-gray-200 h-screen w-2/5'></div> {children}
    </div>
  )
}

export default AuthLayout
