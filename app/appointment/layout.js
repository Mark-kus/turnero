import React from 'react'
import Navbar from '../ui/user/Navbar'

const UserLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  )
}

export default UserLayout
