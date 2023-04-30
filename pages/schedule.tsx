import React from 'react'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Loading from '../components/Loading'
import { Locked } from '../components/Icons/Locked'
import { onSignIn } from '../lib/onSignIn'

const Schedule: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()


  
  

  return (
    <div className='relative h-screen w-screen w:w-full flex justify-center items-center'>
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
          <Loading theme={''}></Loading>
        </div>
      }
    </div>
  )
}

export default Schedule
export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {
      session
    }
  }
}