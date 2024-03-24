import React from 'react'
import Link from 'next/link'

const LinkButton = ({ href, className, children }) => {
  return (
    <Link
      href={href}
      className={`btn btn-outline shadow-none rounded-xl h-10 min-h-10 font-medium bg-opacity-40 ${className}`}>
      {children}
    </Link>
  )
}

export default LinkButton
