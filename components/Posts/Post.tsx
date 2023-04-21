import React, { FC, useState, useRef, useEffect } from 'react'
import { Heart } from '../Icons/Heart'
import LeftArrow from '../Icons/LeftArrow'
import RightArrow from '../Icons/RightArrow'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import axios from 'axios'
import { useSession } from 'next-auth/react'


SwiperCore.use([Navigation, Pagination]);

interface Post {
  _id: string,
  profile_pic: string,
  author: string,
  post_pic: string[],
  like: number,
  time: string,
  title: string,
  description: string,
  setLikedPosts: any,
  setUnlikedPosts: any
}

const Post: FC<Post> = ({ _id, profile_pic, author, post_pic, like, time, title, description, setLikedPosts,setUnlikedPosts }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState<boolean>(session?.user?.postLiked.includes(_id) ? true : false)
  const [isHeartShown, setIsHeartShown] = useState<boolean>(false)
  const [isShown, setIsShown] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showLike, setShowLike] = useState<number>(like)
  const swiperRef: any = useRef(); 

  const previousSlide = (): void => {
    if(currentIndex === 0) {
      setCurrentIndex(post_pic.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }

    swiperRef.current.slidePrev()

  }

  const nextSlide = () => {
    if(currentIndex === post_pic.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }

    swiperRef.current.slideNext()
  }


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

  const onPostDoubleClicked = () => {
    setIsLiked(!isLiked)
    if(!isLiked) {
      setIsHeartShown(true)
      setTimeout(() => {
        setIsHeartShown(false)
      }, 1000)
    } else {
      setIsHeartShown(false)
    }
  }

  // updates likes every time that the user reloads the page
  useEffect(() => {

    const addLiked = async () => {
      const response = await axios.patch('/api/posts/addLiked', { _id: _id, like: like + 1 })
    }

    const removeLiked = async () => {
      const response = await axios.patch('/api/posts/addLiked', { _id: _id, like: like - 1 })
    }

    // not yet liked
    // can only add like
    if(!session?.user?.postLiked.includes(_id)) {
      if(isLiked) {
        localStorage.setItem(_id, "true")
        setShowLike(showLike + 1)  
      } 
      
      if(!isLiked) {
        localStorage.removeItem(_id)
        setShowLike(showLike - 1)
      }
      
      if(localStorage.getItem(_id)) {
        window.addEventListener('beforeunload', addLiked)
        setLikedPosts((likedPosts: any) => [...likedPosts, _id])
      } else {
        setLikedPosts((likedPosts: any) => likedPosts.filter((post: string) => post !== _id))
      }
    }


    // already liked
    // can only remove like 
    if(session?.user?.postLiked.includes(_id)) {
      if(isLiked) {
        localStorage.removeItem(_id)
        setShowLike(showLike + 1)
      }

      if(!isLiked) {
        localStorage.setItem(_id, "false")
        setShowLike(showLike - 1)
      }

      if(localStorage.getItem(_id)) {
        window.addEventListener('beforeunload', removeLiked)
        setUnlikedPosts((unlikedPosts: any) => [...unlikedPosts, _id])
      } else {
        setUnlikedPosts((unlikedPosts: any) => unlikedPosts.filter((post: string) => post !== _id))
      }
    }


    return () => {
      if(session?.user?.postLiked.includes(_id)) {
        if(localStorage.getItem(_id)) { 
          window.removeEventListener('beforeunload', removeLiked)
        }
      } 
      
      if(!session?.user?.postLiked.includes(_id)) {
        if(localStorage.getItem(_id)) {

          window.removeEventListener('beforeunload', addLiked)
        }
      }
    }
  }, [isLiked])
  

  
  return (
    <div className='w-full max-w-[18rem] sm:max-w-none sm:w-auto bg-white dark:bg-[#B8C6CA] flex flex-col justify-center border dark:border-none'>

      {/* Author and Profile Pic */}
      <div className="inline-flex">
        {/* Profile Pic */}
        <div className='p-3 relative mx-auto w-full overflow-hidden flex space-x-5'>
            <div className='w-10 h-10'>
              <div className='w-full h-full aspect-w-1 aspect-h-1 rounded-full overflow-hidden'>
                <Image src={profile_pic} alt="shiro" width={9000} height={9000} className='object-cover w-full h-full'></Image>
              </div>
            </div>
            <div className='mt-1.5 font-mont text-black dark:text-black'>{ author }</div>
          </div>
      </div>

      {/* Post Image */}
      
      <div className='relative mx-auto w-full overflow-hidden flex'>
        <div className='w-72 h-72 sm:w-96 sm:h-96 '>
          {post_pic.length === 1 && 
            <div onDoubleClick={onPostDoubleClicked} className='w-full h-full relative transition-all'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${isHeartShown? 'animate-like-heart-animation' : 'hidden'} fill-[#FF3040] stroke-none z-40 w-48 h-48 absolute top-0 right-0 bottom-0 left-0 m-auto`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <Image src={post_pic[0]} alt="" className='object-cover' fill></Image> 
            </div>
          }
          {post_pic.length > 1 && 
            // Desktop Post Slides
            <div onDoubleClick={onPostDoubleClicked} className='w-full h-full relative transition-all'>
              
              {/* Old version */}
              {/* {post_pic.map((src, i) => {
                return (
                  <Transition
                    key={i}
                    show={currentIndex === i}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Image key={i} src={src} alt="" className={`object-cover transition-all duration-75 `} fill /> 
                  </Transition>

                )
              })} */}

              <Swiper
                navigation
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className='w-full h-full'
              >
                {post_pic.map((src, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <Image key={i} src={src} alt="" className={`object-cover transition-all duration-75 `} fill /> 
                    </SwiperSlide>
                  )
                })}
              </Swiper>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${isHeartShown? 'animate-like-heart-animation' : 'hidden'} fill-[#FF3040] stroke-none z-40 w-48 h-48 absolute top-0 right-0 bottom-0 left-0 m-auto`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              



              {/* Previous Slide Button */}
              <div onClick={previousSlide} className={`${currentIndex === 0 ? 'hidden' : ''} cursor-pointer transition-all ease-in duration-75 flex justify-center items-center absolute top-1/2 -translate-1/2 left-2  rounded-full bg-gray-300 opacity-80 z-40 p-1`}>
                <LeftArrow className={"pr-0.5"}></LeftArrow>
              </div>

              {/* Next Slide Button */}
              <div onClick={nextSlide} className={`${currentIndex === post_pic.length - 1 ? 'hidden' : ''} cursor-pointer transition-all ease-in duration-75 flex justify-center items-center absolute top-1/2 -translate-1/2 right-2  rounded-full bg-gray-300 opacity-80 z-40 p-1`}>
                <RightArrow className={"pl-0.5"}></RightArrow>
              </div>
            </div>

          }
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
          <Heart onClick={onHeartClicked} isActive={isLiked} className={`${isLiked ? 'animate-like-button-animation hover:opacity-100' : ''} hover:opacity-50 transition-all duration-100 ease-in-out`} />

          {/* Time ago */}
          <div className='font-mont text-black text-xs dark:text-black'>
            { time }
          </div>

        </div>

        {/* Likes */}
        <div className="inline-flex w-full px-3 py-1 justify-start items-center">
          <div className="font-mont text-black text-xs dark:text-black">
            { showLike } likes
          </div>
        </div>

        {/* User and description */}
        <div className="flex flex-col w-full px-3 pt-1 pb-3 justify-start ">
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
              <button onClick={onShowClicked} className='text-[#D9D9D9] dark:text-gray-500'>more</button>
            </div>
            
            
            : description }

          </div>
        </div>

      </div>

    </div>
  )
}

export default Post