import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Post from '../components/Posts/Post'


const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
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

  return (
    <div className={` w-screen  md:h-auto md:w-full flex justify-center items-center`}>
      <Head>
        <title>MUIDS | Homeroom Hub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-center items-center w-full md:mt-0 md:py-0 md:my-10 space-y-5'>
        <Post profile_pic='a' author='Pak' post_pic='b' like={30} time='3 days ago' title='First Test' description='Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat ea eveniet nulla error, dolore, repudiandae sapiente suscipit, odit in ipsam perferendis similique fugit. Debitis cupiditate obcaecati totam minus nobis!
'></Post>
        <Post profile_pic='a' author='Pak' post_pic='b' like={30} time='3 days ago' title='First Test' description='First Test'></Post>
        <Post profile_pic='a' author='Pak' post_pic='b' like={30} time='3 days ago' title='First Test' description='First Test'></Post>
        <Post profile_pic='a' author='Pak' post_pic='b' like={30} time='3 days ago' title='First Test' description='First Test'></Post>
        <Post profile_pic='a' author='Pak' post_pic='b' like={30} time='3 days ago' title='First Test' description='First Test'></Post>
        <Post profile_pic='a' author='Pak' post_pic='b' like={30} time='3 days ago' title='First Test' description='First Test'></Post>
      </div>
      
    </div>
  )
}

export default Home
