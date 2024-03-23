import React from 'react'

const MinimalInput = ({ placeholder, className }) => {
  return (
    <input
      type='text'
      placeholder={placeholder || 'Placeholder'}
      className={`input bg-neutral border-2 border-base-300 w-full ${className}`}
    />
  )
}

export default MinimalInput
