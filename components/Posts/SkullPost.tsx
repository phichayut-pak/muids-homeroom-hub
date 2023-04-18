import React from 'react'

const SkullPost = () => {
  return (
    <div className='w-full max-w-[18rem] sm:max-w-none sm:w-auto bg-white dark:bg-[#B8C6CA] flex flex-col justify-center border dark:border-none'>

      {/* Author and Profile Pic */}
      <div className="inline-flex">
        {/* Profile Pic */}
        <div className='p-3 relative mx-auto w-full overflow-hidden flex space-x-5'>
            <div className='w-10 h-10'>
              <div className='w-full h-full aspect-w-1 aspect-h-1 rounded-full overflow-hidden bg-gray-500 animate-pulse'>
                
              </div>
            </div>
            <div className='mt-1.5 font-mont text-black dark:text-black'></div>
          </div>
      </div>

      {/* Post Image */}
      
      <div className='relative mx-auto w-full overflow-hidden flex'>
        <div className='w-72 h-72 sm:w-96 sm:h-96 '>
            <div  className='w-full h-full relative transition-all bg-gray-500 animate-pulse'>
              
            </div>
          
        </div>
      </div>

      {/* Lower part */}
      <div className='flex flex-col justify-center items-center'>
        
        {/* Like and Time */}
        <div className='inline-flex w-full px-3 py-2 justify-between items-center'>
          {/* Inactive Like as default */}
          {/* When user clicks like button, localStorage collects ID of the post that is liked */}
          {/* It then send to the db every one hour */}
          {/* Look at ChatGPT for more information */}

          {/* Heart Button */}
          <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse"></div>

          {/* Time ago */}
          <div className='font-mont text-black text-xs dark:text-black w-36 h-8 bg-gray-500 animate-pulse'>
            
          </div>

        </div>

        {/* Likes */}
        <div className="inline-flex w-full px-3 py-1 justify-start items-center">
          <div className="font-mont text-black text-xs dark:text-black">
          
          </div>
        </div>

        {/* User and description */}
        <div className="flex flex-col w-full pl-3 pt-1 pb-3 justify-start ">

          <div className="font-mont text-black text-xs max-w-[16rem] sm:max-w-[21rem] md:max-w-[22.5rem] dark:text-black w-96 pr-2 h-36 bg-gray-500 animate-pulse">
            

          </div>
        </div>

      </div>

    </div>
  )
}

export default SkullPost