import React, { FC, useState, useRef, useEffect } from 'react'
import { Heart } from '../Icons/Heart'
import LeftArrow from '../Icons/LeftArrow'
import RightArrow from '../Icons/RightArrow'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import { useSession } from 'next-auth/react'
import { format,  } from 'timeago.js';
import { Ellipsis } from '../Icons/Ellipsis'
import Popover from "@mui/material/Popover";
import { Bin } from '../Icons/Bin'
import axios from 'axios'
import Swal from 'sweetalert2'


SwiperCore.use([Navigation, Pagination]);

interface Post {
  _id: string,
  profile_pic: string,
  author: string,
  post_pic: any,
  like: number,
  time: number,
  title: string,
  description: string,
  setLikedPosts: any,
  setUnlikedPosts: any
}

const Post: FC<Post> = ({ _id, profile_pic, author, post_pic, like, time, title, description, setLikedPosts,setUnlikedPosts }) => {
  const { data: session }: any = useSession()
  const [isLiked, setIsLiked] = useState<boolean>(session?.user?.postLiked.includes(_id) ? true : false)
  const [isHeartShown, setIsHeartShown] = useState<boolean>(false)
  const [isShown, setIsShown] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showLike, setShowLike] = useState<number>(like)
  const swiperRef: any = useRef(); 
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;





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

    if(!isLiked) {
      setShowLike(s => s + 1)
    } else {
      setShowLike(s => s - 1)
    }
  }

  const onShowClicked = () => {
    setIsShown(true)

  }

  const handleOnRemovePost = async () => {
    const result = await axios.patch(`/api/posts/deletePost`, {

        _id
      
    })

    if(result.status === 200) {
      Swal.fire({
        title: 'Post deleted successfully',
        icon: 'success'
      })
    } else {
      Swal.fire( {
        title: 'Post deleted unsuccessfully',
        text: 'Please contact admin for more information',
        icon: 'error'
      })
    }
  }

  const onPostDoubleClicked = () => {
    // setIsLiked(!isLiked)
    // if(!isLiked) {
    //   setShowLike(s => s + 1)
    //   setIsHeartShown(true)
    //   setTimeout(() => {
    //     setIsHeartShown(false)
    //   }, 1000)
    // } else {
    //   setShowLike(s => s - 1)
    //   setIsHeartShown(false)
    // }
  }

  // POST SYSTEM
  // useEffect(() => {
    
  //   const addLiked = async () => {
  //     const response = await axios.patch('/api/posts/addLiked', { _id: _id, like: like + 1 })
      
  //   }

  //   const removeLiked = async () => {
  //     const response = await axios.patch('/api/posts/addLiked', { _id: _id, like: like - 1 })
  //     console.log('remove')
  //   }



    
  //   // not yet liked
  //   // can only add like
  //   if(!session?.user?.postLiked.includes(_id)) {
      
  //     if(isLiked) {
  //       localStorage.setItem(_id, "true")
  //     } 
      
  //     if(!isLiked) {
  //       localStorage.removeItem(_id)
  //     }
      
  //     if(localStorage.getItem(_id)) {
  //       addLiked()
  //       setLikedPosts((likedPosts: any) => [...likedPosts, _id])
  //     } else {
  //       setLikedPosts((likedPosts: any) => likedPosts.filter((post: string) => post !== _id))
  //     }
  //   }


  //   // already liked
  //   // can only remove like 
  //   if(session?.user?.postLiked.includes(_id)) {
  //     if(isLiked) {
  //       localStorage.removeItem(_id)

  //     }

  //     if(!isLiked) {
  //       localStorage.setItem(_id, "false")

  //     }

  //     if(localStorage.getItem(_id)) {
  //       removeLiked()
  //       setUnlikedPosts((unlikedPosts: any) => [...unlikedPosts, _id])
  //     } else {
  //       setUnlikedPosts((unlikedPosts: any) => unlikedPosts.filter((post: string) => post !== _id))
  //     }
  //   }




  //   // return () => {
  //     // if(session?.user?.postLiked.includes(_id)) {
  //     //   if(localStorage.getItem(_id)) {
  //     //     window.removeEventListener('beforeunload', removeLiked)
  //     //   }
  //     // } 
      
  //     // if(!session?.user?.postLiked.includes(_id)) {
  //     //   if(localStorage.getItem(_id)) {
  //     //     window.removeEventListener('beforeunload', addLiked)
  //     //   }
  //     // }

  //   // }
  // }, [isLiked])
  

  
  return (
    <div className='w-full max-w-[18rem] sm:max-w-none sm:w-auto bg-white dark:bg-[#B8C6CA] flex flex-col justify-center border dark:border-none'>

      {/* Author and Profile Pic */}
      <div className="inline-flex">
        {/* Profile Pic */}
        <div className='p-3 relative mx-auto w-full flex overflow-hidden justify-between items-center'>
          <div className='flex justify-center items-center space-x-3'>

            <div className='w-10 h-10'>
              <div className='w-full h-full aspect-w-1 aspect-h-1 overflow-hidden rounded-sm'>
                <Image src={profile_pic} alt="MUIDS" width={9999} height={9999} className='object-cover w-full h-full'></Image>
              </div>
            </div>
            
            <div className='mt-1.5 font-mont text-black dark:text-black'>{ author } • <span className='font-mont text-gray-800 text-[0.7rem] sm:text-xs '>{ format(time) }{post_pic.length === 1}</span> </div>
          </div>
            
            <div onClick={handleClick} className='cursor-pointer'>
              <Ellipsis  className={`${session && session?.user?.isAdmin ? '' : 'hidden'} w-8 h-8 `}></Ellipsis>

            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right"
              }}
            >
              <div onClick={handleOnRemovePost} className='cursor-pointer p-2 px-3 font-mont text-red-500 text-sm flex'>
                Delete <span><Bin className={'ml-1 w-5 h-5'}></Bin></span>
              </div>

            </Popover>
  
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
              <Image src={post_pic[0].secure_url} key={post_pic[0].public_id} alt={post_pic[0].public_id} className='object-cover' fill></Image> 
            </div>
          }
          {post_pic.length > 1 && 
            // Desktop Post Slides
            <div onDoubleClick={onPostDoubleClicked} className='w-full h-full relative transition-all'>

            
              <Swiper
              navigation
              pagination={true}
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className='w-full h-full'
              >
                {post_pic.map((_n: any, i: any) => {
                  return (
                    <SwiperSlide key={i}>
                      <Image key={post_pic[i].public_id} src={post_pic[i].secure_url} alt="" className={`object-cover transition-all duration-75 `} fill /> 
                    </SwiperSlide>
                  )
                })}

              </Swiper>
              

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${isHeartShown? 'animate-like-heart-animation' : 'hidden'} fill-[#FF3040] stroke-none z-40 w-48 h-48 absolute top-0 right-0 bottom-0 left-0 m-auto`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              



              {/* Previous Slide Button */}
              <div onClick={previousSlide} className={`${currentIndex === 0 ? 'hidden' : ''} cursor-pointer transition-all ease-in duration-75 flex justify-center items-center absolute top-1/2 -translate-1/2 left-2  rounded-full bg-gray-300 opacity-80 z-10 p-1`}>
                <LeftArrow className={"pr-0.5"}></LeftArrow>
              </div>

              {/* Next Slide Button */}
              <div onClick={nextSlide} className={`${currentIndex === post_pic.length - 1 ? 'hidden' : ''} cursor-pointer transition-all ease-in duration-75 flex justify-center items-center absolute top-1/2 -translate-1/2 right-2  rounded-full bg-gray-300 opacity-80 z-10 p-1`}>
                <RightArrow className={"pl-0.5"}></RightArrow>
              </div>
            </div>

          }
        </div>
      </div>

      {/* Lower part */}
      <div className='flex flex-col justify-center items-center'>
        
        {/* Like and Time */}
        {/* <div className='inline-flex w-full px-3 py-2 justify-between items-center'> */}
          {/* Inactive Like as default */}
          {/* When user clicks like button, localStorage collects ID of the post that is liked */}
          {/* It then send to the db every one hour */}
          {/* Look at ChatGPT for more information */}

          {/* Heart Button */}
          {/* <Heart onClick={onHeartClicked} isActive={isLiked} className={`${isLiked ? 'animate-like-button-animation hover:opacity-100' : ''} hover:opacity-50 transition-all duration-100 ease-in-out`} /> */}

          {/* Time ago */}
          {/* <div className='font-mont text-black text-xs dark:text-black'> */}
            {/* { time } */}
          {/* </div> */}

        {/* </div> */}

        {/* Likes */}
        {/* <div className="inline-flex w-full px-3 py-1 justify-start items-center">
          <div className="font-mont text-black text-xs dark:text-black">
            { showLike } likes
          </div>
        </div> */}

        {/* Title and description */}
        <div className="flex flex-col w-full px-3 pt-5 pb-3 justify-start ">
          {/* Title */}
          <div className="font-mont text-black text-xs font-bold dark:text-black">
            { title }
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