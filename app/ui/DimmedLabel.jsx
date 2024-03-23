import React from 'react'
import Label from './Label'
import { workSans } from './fonts'

const DimmedLabel = ({ containerClassName, labelClassName, children }) => {
  return (
    <Label
      containerClassName={`${containerClassName}`}
      labelClassName={`${workSans.className} font-medium text-opacity-50 ${labelClassName}`}>
      {children}
    </Label>
  )
}

export default DimmedLabel
