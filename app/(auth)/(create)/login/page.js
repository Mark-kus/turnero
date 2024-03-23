'use client'
import Label from '@/app/ui/Label'
import UnborderedInput from '@/app/ui/UnborderedInput'
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/app/ui/Button'
// <label className='swap'>
//   {/* this hidden checkbox controls the state */}
//   <input type='checkbox' />

//   {/* volume on icon */}
//   <svg
//     className='swap-on fill-current'
//     xmlns='http://www.w3.org/2000/svg'
//     width='48'
//     height='48'
//     viewBox='0 0 24 24'>
//     <path d='M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z' />
//   </svg>

//   {/* volume off icon */}
//   <svg
//     className='swap-off fill-current'
//     xmlns='http://www.w3.org/2000/svg'
//     width='48'
//     height='48'
//     viewBox='0 0 24 24'>
//     <path d='M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z' />
//   </svg>
// </label>

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <section className='m-auto'>
      <h1 className='text-3xl font-bold mb-10'>Log In</h1>
      <label className='form-control w-full'>
        <Label>Email Address</Label>
        <UnborderedInput />
      </label>
      <label className='form-control w-full mt-4'>
        <Label>Password</Label>
        <div className='relative'>
          <UnborderedInput type={showPassword ? 'text' : 'password'} />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 px-4 py-2'>
            X
          </button>
        </div>
        <div className='label'>
          <span className='label-text-alt opacity-80'>
            It must be a combination of minimum 8 letters, number, and symbols.
          </span>
        </div>
      </label>
      <div className='flex justify-between my-2'>
        <label className='label p-0 cursor-pointer flex-row-reverse justify-end'>
          <span className='label-text text-xs ml-2'>Remember me</span>
          <input
            type='checkbox'
            defaultChecked
            className='checkbox checkbox-xs rounded-sm border-2 '
          />
        </label>
        <Link
          href={'/password/forgot'}
          className='link link-hover text-xs'>
          Forgot Password?
        </Link>
      </div>
      <Button className={'mb-10 w-full'}>Log In</Button>
      <div className='flex gap-4'>
        <Button className={'btn-outline btn-wide border-2'}>Log in with Google</Button>
        <Button className={'btn-outline btn-wide border-2'}>Log in with Apple</Button>
      </div>
      <div className='divider my-8'></div>
      <Link
        href='/register'
        className='link link-hover text-xs'>
        No account yet? Sign Up
      </Link>
    </section>
  )
}

export default Login
