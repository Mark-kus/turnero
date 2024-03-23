import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='navbar bg-base-300 px-8'>
      <div className='flex-1'>
        <Link
          href='/appointment'
          className='btn btn-ghost text-xl'>
          Turnero
        </Link>
      </div>
      <div className='flex-none gap-6'>
        <Link
          className='link link-hover text-primary text-sm font-medium'
          href='/'>
          View appointments
        </Link>
        <Link
          className='link link-hover text-primary text-sm font-medium'
          href='/'>
          Book appointments
        </Link>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <Image
                alt='Tailwind CSS Navbar component'
                src={'/vercel.svg'}
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
