import React from 'react'
import Link from 'next/link'

const LinkButton = ({ href, className, children }) => {
  return (
    <Link
      href={href}
      className={`btn btn-primary btn-outline shadow-none rounded-xl h-10 min-h-10 font-medium bg-primary-content bg-opacity-40 text-primary ${className}`}>
      {children}
    </Link>
  )
}

export default LinkButton
