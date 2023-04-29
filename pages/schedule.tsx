import React from 'react'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Schedule: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()


  
  

  return (
    <div>
      Schedule
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