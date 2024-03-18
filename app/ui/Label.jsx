import React from 'react'

const Label = ({ containerClassName, labelClassName, children }) => {
  return (
    <div className={`label p-0 pb-2 ${containerClassName}`}>
      <span className={`label-text text-xs ${labelClassName}`}>{children}</span>
    </div>
  )
}

export default Label
