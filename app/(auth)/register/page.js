import React from 'react'
import Link from 'next/link'
import Label from '@/app/ui/Label'
import UnborderedInput from '@/app/ui/UnborderedInput'

const Register = () => {
  return (
    <section className='m-auto'>
      <h1 className='text-3xl font-bold mb-10'>Sign Up</h1>
      <div className='flex gap-4'>
        <label className='form-control w-full'>
          <Label>First Name</Label>
          <UnborderedInput />
        </label>
        <label className='form-control w-full'>
          <Label>Last Name</Label>
          <UnborderedInput />
        </label>
      </div>
      <label className='form-control w-full mt-4'>
        <Label>Email</Label>
        <UnborderedInput />
      </label>
      <label className='form-control w-full mt-4'>
        <Label>Password</Label>
        <UnborderedInput />
      </label>
      <label className='label p-0 my-4 cursor-pointer flex-row-reverse justify-end'>
        <span className='label-text text-xs ml-2'>Vertibulum faucibus odio vitae arcu auctor lectus</span>
        <input
          type='checkbox'
          defaultChecked
          className='checkbox checkbox-xs rounded-sm border-2 '
        />
      </label>
      <button className='btn btn-primary rounded-xl w-full mb-10 h-10 min-h-10'>Button Text</button>
      <div className='flex gap-4'>
        <button className='btn btn-outline btn-primary btn-wide border-2 rounded-xl h-10 min-h-10'>
          Log in with Google
        </button>
        <button className='btn btn-outline btn-primary btn-wide border-2 rounded-xl h-10 min-h-10'>
          Log in with Apple
        </button>
      </div>
      <div className='divider my-8'></div>
      <Link
        href='/login'
        className='link link-hover text-xs'>
        Already have an account?
      </Link>
    </section>
  )
}

export default Register
