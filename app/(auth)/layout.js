import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='bg-gray-200 h-screen w-1/2'></div>
      {children}
    </div>
  )
}

export default AuthLayout
