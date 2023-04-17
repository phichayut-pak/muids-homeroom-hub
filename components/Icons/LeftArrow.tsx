import React, { FC } from 'react'

interface LeftArrow {
  className: string
}

const LeftArrow: FC<LeftArrow> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className={`w-5 h-5 ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>

  )
}

export default LeftArrow