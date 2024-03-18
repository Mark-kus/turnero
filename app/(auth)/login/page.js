import Label from '@/app/ui/Label'
import UnborderedInput from '@/app/ui/UnborderedInput'
import React from 'react'
import Link from 'next/link'
import Button from '@/app/ui/Button'

const Login = () => {
  return (
    <section className='m-auto'>
      <h1 className='text-3xl font-bold mb-10'>Log In</h1>
      <label className='form-control w-full'>
        <Label>Email Address</Label>
        <UnborderedInput />
      </label>
      <label className='form-control w-full mt-4'>
        <Label>Password</Label>
        <UnborderedInput />
        <div className='label'>
          <span className='label-text-alt opacity-80'>
            It must be a combination of minimum 8 letters, number, and symbols.
          </span>
        </div>
      </label>
      <div className='flex justify-between my-4'>
        <label className='label p-0 cursor-pointer flex-row-reverse justify-end'>
          <span className='label-text text-xs ml-2'>Remember me</span>
          <input
            type='checkbox'
            defaultChecked
            className='checkbox checkbox-xs rounded-sm border-2 '
          />
        </label>
        <Link
          href={'/forgot-password'}
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
