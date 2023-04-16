import React, { FC, useState } from 'react'
import { Heart } from '../Icons/Heart'
import Image from 'next/image'
import Shiro from '../../public/shiro.jpg'
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
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isShown, setIsShown] = useState<boolean>(false)

  const splittedDescription = description.split(' ')
  let truncatedDescription
  if(splittedDescription.length > 30) {
    truncatedDescription = splittedDescription.slice(0, 30).join(' ')
  }
  const onHeartClicked = () => {
    setIsLiked(!isLiked)
  }

  const onShowClicked = () => {
    setIsShown(true)

  }


  return (
    <div className='w-full max-w-[18rem] sm:max-w-none sm:w-auto bg-white dark:bg-[#B8C6CA] flex flex-col justify-center border dark:border-none'>
      {/* Author and Profile Pic */}
      <div className="inline-flex">
        {/* Profile Pic */}
        <div className='p-3 relative mx-auto w-full overflow-hidden flex space-x-5'>
            <div className='w-10 h-10'>
              <div className='w-full h-full aspect-w-1 aspect-h-1 rounded-full overflow-hidden'>
                <Image src={Shiro} alt="shiro" className='object-cover w-full h-full'></Image>
              </div>
            </div>
            <div className='mt-1.5 font-mont text-black dark:text-black'>{ author }</div>
          </div>
      </div>

      {/* Post Image */}
      <div className='relative mx-auto w-full overflow-hidden flex'>
        <div className='w-72 h-72 sm:w-96 sm:h-96 bg-black'>
          <Image src={Shiro} alt="shiro" className='object-cover' fill></Image>
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
          <Heart onClick={onHeartClicked} isActive={isLiked} />

          {/* Time ago */}
          <div className='font-mont text-black text-xs dark:text-black'>
            { time }
          </div>

        </div>

        {/* Likes */}
        <div className="inline-flex w-full px-3 py-1 justify-start items-center">
          <div className="font-mont text-black text-xs dark:text-black">
            { like } likes
          </div>
        </div>

        {/* User and description */}
        <div className="flex flex-col w-full px-3 py-1 justify-start ">
          {/* User */}
          <div className="font-mont text-black text-xs font-bold dark:text-black">
            { author }
          </div>

          {/* Description */}
          <div className="font-mont text-black text-xs max-w-[16rem] sm:max-w-[21rem] md:max-w-[22rem] dark:text-black">
            { !isShown && splittedDescription.length > 30 ? 
            <div>
              {truncatedDescription}
              <br />
              ...
              <br />
              <button onClick={onShowClicked} className='text-[#D9D9D9]'>more</button>
            </div>
            
            
            : description }

          </div>
        </div>

      </div>

    </div>
  )
}

export default Post