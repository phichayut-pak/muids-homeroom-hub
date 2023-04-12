import { FC, useState } from 'react'

interface Heart {
  isActive: boolean,
  onClick: any
}


export const Heart: FC<Heart> = ({ isActive, onClick }) => {


  const onHeartClick = () => {
    onClick()

  }

  return (
    <svg onClick={onHeartClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 cursor-pointer transition-all duration-75 ${isActive? 'fill-[#FF3040] stroke-[#FF3040]' : 'fill-none stroke-black'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}