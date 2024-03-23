import React from 'react'
import Label from '../../../ui/Label'
import UnborderedInput from '../../../ui/UnborderedInput'
import Button from '../../../ui/Button'

const ForgotPassword = () => {
  return (
    <>
      <h1 className='text-4xl font-bold'>Forgotten your password?</h1>
      <p className='mb-6 mt-2'>
        There is nothing to worry about, we&apos;ll send you a message to help you reset your password.
      </p>
      <label>
        <Label>Email Address</Label>
        <UnborderedInput placeholder={'Enter personal or work email address'} />
      </label>
      <Button className={'mt-4 w-full'}>Send Reset Link</Button>
    </>
  )
}

export default ForgotPassword
