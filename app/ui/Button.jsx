import React from 'react'

const Button = ({ className, children }) => {
  return <button className={`btn btn-primary rounded-xl h-10 min-h-10 ${className}`}>{children}</button>
}

export default Button
