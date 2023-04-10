import React, { FC } from 'react'
import Image from 'next/image'
import whiteMuidsLogo from "../public/white-muids-logo.png"


const Loading: FC = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-[#1E2C5A]'>
      <div className='relative mx-auto w-24 h-24 sm:w-40 sm:h-40 md:w-60 md:h-60 overflow-hidden'>
        <Image src={whiteMuidsLogo} style={{ objectFit: 'cover' }} alt='MUIDS Logo'/>
      </div>
        <div
          className="mt-6 sm:mt-8 md:mt-11 absolute inline-block h-40 w-40 sm:h-60 sm:w-60 md:h-96 md:w-96 animate-spin rounded-full border-4 border-solid border-current border-white border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
      
    </div>
  )
}

export default Loading