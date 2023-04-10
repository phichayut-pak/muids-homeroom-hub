import React from 'react'
import { NextPage } from 'next'

const Custom404: NextPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-white'>
      <div className='text-[#1E2C5A] font-mont text-5xl font-bold'>Page Not Found!</div>
    </div>
  )
}

export default Custom404