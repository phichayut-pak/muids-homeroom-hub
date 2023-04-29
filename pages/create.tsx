import React from 'react'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'

const Create: NextPage = () => {
  return (
    <div>
      Create
    </div>
  )
}

export default Create
export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context)

  if(!session || session.user.isAdmin === false) {
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
