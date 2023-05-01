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
    <div className='relative h-screen w-screen md:w-full flex justify-center items-center'>
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

      { status === 'authenticated' && 
        <div className='mt-3 absolute inset-10 flex flex-col'>
          
          {/* Select */}
          <div className='flex justify-start items-center space-x-5 pb-16 md:pb-10'>

            {/* Grade (10, 11, 12) */}
            <div className='space-x-2'>
              <label htmlFor="grade" className='text-white font-mont text-xl'>Grade</label>
              <select  name="grade" id="grade" className='px-2 py-1 text-xl border border-black bg-whte text-black font-mont outline-none'>
                <option value="10" className='text-xl font-mont'>10</option>
                <option value="11" className='text-xl font-mont'>11</option>
                <option value="12" className='text-xl font-mont'>12</option>
              </select>
            </div>

            {/* Class (01 - 12) */}
            <div className="space-x-2">
            <label htmlFor="class" className='text-white font-mont text-xl'>Class</label>
              <select  name="class" id="class" className='px-2 py-1 text-xl border border-black bg-whte text-black font-mont outline-none'>
                <option value="01" className='text-xl font-mont'>01</option>
                <option value="02" className='text-xl font-mont'>02</option>
                <option value="03" className='text-xl font-mont'>03</option>
                <option value="04" className='text-xl font-mont'>04</option>
                <option value="05" className='text-xl font-mont'>05</option>
                <option value="06" className='text-xl font-mont'>06</option>
                <option value="07" className='text-xl font-mont'>07</option>
                <option value="08" className='text-xl font-mont'>08</option>
                <option value="09" className='text-xl font-mont'>09</option>
                <option value="10" className='text-xl font-mont'>10</option>
                <option value="11" className='text-xl font-mont'>11</option>
                <option value="12" className='text-xl font-mont'>12</option>
              </select>
            </div>
          </div>

          <div className="w-full h-full bg-gray-400 mb-20 md:mb-5 flex justify-center items-center font-mont text-white font-bold text-xl sm:text-3xl md:text-4xl lg:text-6xl">
            SCHEDULE IMAGE
          </div>


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