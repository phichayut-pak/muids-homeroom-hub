import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Post from '../components/Posts/Post'
import Script from 'next/script'
import axios from 'axios'
import SkullPost from '../components/Posts/SkullPost'
import { useSession, getSession } from 'next-auth/react'
import { Locked } from '../components/Icons/Locked'
import Swal from 'sweetalert2'
import { signIn } from 'next-auth/react'
import Loading from '../components/Loading'


const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [posts, setPosts] = useState<any>()
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [unlikedPosts, setUnlikedPosts] = useState<string[]>([])
  const { data: session, status }: any = useSession()
  
  useEffect(() => {
    themeCheck()
  })

  const themeCheck = () => {
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true)
    } else{
      setDarkMode(false)
    }
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/posts/get_posts')
      const data = await response.data
      
      setPosts(data.posts)
      
    }
      fetchPosts()
  }, [])

  // POST SYSTEM

  // useEffect(() => {

  //   const handleSaveLikedPosts = async () => {
  //     const response = await axios.patch('/api/posts/addLikedPosts', {
  //       _id: session?.user?._id,
  //       likedPosts
  //     })
  //   }

    
  //   if(likedPosts.length !== 0) {
      
  //     document.addEventListener('beforeunload', handleSaveLikedPosts)
  //   }

  //   return () => {
  //     if(likedPosts.length !== 0) {
      
  //       window.removeEventListener('beforeunload', handleSaveLikedPosts)
  //     }
  //   }
  // })

  // useEffect(() => {

  //   const handleSaveUnlikedPosts = async () => {
  //     const response = await axios.patch('/api/posts/removeLikedPosts', {
  //       _id: session?.user?._id,
  //       unlikedPosts,
  //       currentLikedPosts: session?.user?.postLiked
  //     })
  //   }

    
  //   if(unlikedPosts.length !== 0) {
      
  //     window.addEventListener('beforeunload', handleSaveUnlikedPosts)
  //   }

  //   return () => {
  //     if(unlikedPosts.length !== 0) {
      
  //       window.removeEventListener('beforeunload', handleSaveUnlikedPosts)
  //     }
  //   }
  // })



  const onSignIn = () => {

    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Sign in',
        background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
        color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
        html:
          '<input type="email" id="swal-input1" class="swal2-input">' +
          '<input type="password" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const receivedUsername = (document.getElementById('swal-input1') as HTMLInputElement).value
          const receivedPassword = (document.getElementById('swal-input2') as HTMLInputElement).value

          if(receivedUsername.trim() === '' || receivedPassword.trim() === '') {
            Swal.fire({
              title: 'Please fill the blank!',
              text: 'You can\'t submit without the blank!',
              icon: 'error'
            })
          }

          Swal.showLoading()

          const result = await signIn('credentials', {
            username: receivedUsername,
            password: receivedPassword,
            redirect: false
          })

          if(result?.status === 401) {
            switch(result.error) {
              case 'No user found!':
                Swal.fire({
                  title: 'No user found!',
                  text: 'The username you entered doesn\'t belong to an account. Please check your username and try again.',
                  icon: 'error',
                  background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
                  color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
                })

                break
              case 'Could not log you in!':
                Swal.fire({
                  title: 'Could not log you in!',
                  text: 'Sorry, your password was incorrect. Please double-check your password.',
                  icon: 'error',
                  background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
                  color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
                })

                break
            }
          } else {
            Swal.fire({
              title: 'Successful!',
              icon: 'success',
              background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : '#FFFFFF'}`,
              color: `${localStorage.getItem('theme') === 'dark' ? '#FFFFFF' : '#000000'}`,
            })

            
          }
        }
      })

    
      })()
  }

  return (
    <div className={` w-screen  md:h-auto md:w-full flex justify-center items-center`}>
      <Head>
        <title>MUIDS | Homeroom Hub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></Script>




      { status === "authenticated" && session && 
        <div className='flex flex-col justify-center items-center w-full md:mt-0 md:py-0 md:my-10 space-y-5'>
        


          { posts && posts.map((_n: any, i: string | number) => {
            return (
              <Post key={posts[i]._id} setUnlikedPosts={setUnlikedPosts} setLikedPosts={setLikedPosts} _id={posts[i]._id} profile_pic={posts[i].profile_pic} author={posts[i].author} post_pic={posts[i].post_pic} like={posts[i].like} time={posts[i].time} title={posts[i].title} description={posts[i].description}></Post>
              )
          })}        

          { !posts && 
            <>
              <SkullPost></SkullPost>
              <SkullPost></SkullPost>
              <SkullPost></SkullPost>
            </>
          }

        </div>
      }
      
      { status === "unauthenticated" && !session && 

        <div className='flex flex-col justify-center items-center h-screen w-screen space-y-5'>
          <Locked className='w-40 h-40 sm:w-48 sm:h-48 md:h-56 md:w-56 lg:w-72 lg:h-72 text-gray-400 dark:text-gray-300'></Locked>
          <div onClick={onSignIn} className='cursor-pointer font-mont font-bold text-xl  w-32 h-12 md:w-36 md:h-14 lg:w-40 lg:h-16 flex justify-center items-center rounded-lg border transition-all duration-100 ease-in-out text-gray-500 hover:text-white hover:bg-gray-500 dark:text-white dark:hover:bg-white dark:hover:text-secondary-dark'>
            Sign in
          </div>
        </div>

      
      }

      { status === "loading" && 
        <div>
          <Loading></Loading>
        </div>
      }

    </div>
  )
}

export default Home
export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)


  return {
    props: {
      session
    }
  }
}


