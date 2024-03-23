import React from 'react'

const Button = ({ disabled, className, children }) => {
  return (
    <button
      disabled={disabled}
      className={`btn btn-primary shadow-none rounded-xl h-10 min-h-10 ${className}`}>
      {children}
    </button>
  )
}

export default Button
