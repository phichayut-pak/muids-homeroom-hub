import React, { FC } from 'react'

interface RightArrow {
  className: string
}

const RightArrow: FC<RightArrow> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className={`w-5 h-5 ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>


  )
}

export default RightArrow