import React, { FC } from 'react'
import { Heart } from '../Icons/Heart'
interface Post {
  profile_pic: string,
  author: string,
  post_pic: string,
  like: number,
  time: string,
  title: string,
  description: string
}

const Post: FC<Post> = ({ profile_pic, author, post_pic, like, time, title, description}) => {
  return (
    <div className='bg-white flex flex-col justify-center border'>
      {/* Author and Profile Pic */}
      <div className="inline-flex">
        {/* Profile Pic */}
        <div className='p-3 relative mx-auto w-full overflow-hidden flex space-x-5'>
            <div className='w-10 h-10  bg-black rounded-full'>
              {/* Put Image here ( profile_pic ) */}
            </div>
            <div className='mt-1.5 font-mont'>{ author }</div>
          </div>
      </div>

      {/* Post Image */}
      <div className='relative mx-auto w-full overflow-hidden flex'>
        <div className='w-72 h-72 sm:w-96 sm:h-96 bg-black'>
          {/* Put Image here ( post_pic ) */}
        </div>
      </div>

      {/* Lower part */}
      <div className='flex flex-col justify-center items-center'>
        
        {/* Like and Time */}
        <div className='inline-flex w-full px-3 py-1 justify-between items-center'>
          {/* Inactive Like as default */}
          {/* When user clicks like button, localStorage collects ID of the post that is liked */}
          {/* It then send to the db every one hour */}
          {/* Look at ChatGPT for more information */}

          {/* Heart Button */}
          <Heart isActive={false} />

          {/* Time ago */}
          <div className='font-mont text-black text-xs'>
            { time }
          </div>

        </div>
      </div>

    </div>
  )
}

export default Post