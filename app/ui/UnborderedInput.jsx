import React from 'react'

const UnborderedInput = ({ placeholder, className }) => {
  return (
    <input
      type='text'
      placeholder={placeholder || 'Placeholder'}
      className={`input bg-neutral rounded-none border-b border-b-base-300 w-full ${className}`}
    />
  )
}

export default UnborderedInput
