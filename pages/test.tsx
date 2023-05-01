import React, { useState, useRef } from 'react'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Locked } from '../components/Icons/Locked'
import { onSignIn } from '../lib/onSignIn'
import { FormEvent } from 'react'
import Loading from '../components/Loading'
import Image from 'next/image'
import Swal from 'sweetalert2'


const Test: NextPage = () => {
  const { data: session, status } = useSession()

  const title: any = useRef("")
  const author: any = useRef("")
  const description: any = useRef("")
  const [files, setFiles] = useState<any>([])



  const onFileSelected = (e: FormEvent<HTMLInputElement>) => {
    const target: any = e.target
    
    if(target.files.length > 4) {
      Swal.fire({
        title: 'Too many files',
        text: 'Maximum 4 images',
        icon: 'error'
      })
      return
    }

    if(target.files.length !== 0 && files.length >= 4) {
      Swal.fire({
        title: 'Too many files',
        text: 'Please delete one of the files to replace',
        icon: 'error'
      })
      return
    }

    if(target.files.length + files.length > 4) {
      Swal.fire({
        title: 'Too many files',
        text: 'Please make sure there are only 4 files in total',
        icon: 'error'
      })
      return
    }

    if(files.length === 0 && files.length < 4) {
      setFiles([...files, ...target.files])
      return
      
    }

    if(files.length !== 0 && files.length < 4) {
      setFiles((file: any) => [...file, ...target.files])
      return
    }

  }

  const onFileRemoved = (fileSelected: any) => {
    setFiles((prevFiles: any) => prevFiles.filter((files: any) => files !== fileSelected))
  }

  const onSubmit = () => {
    console.log({
      title: title.current.value,
      author: author.current.value,
      description: description.current.value,
      files
    })

    title.current.value = ""
    author.current.value = ""
    description.current.value = ""
    setFiles([])
  }


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

      { status === "authenticated" && 
        <div className='w-full h-full '>
          {/* Mobile */}
          <div className='p-5 pt-10 absolute flex flex-col justify-start items-start mb-16 inset-10 md:hidden'>
            
            {/* Title */}
            <div className='relative font-mont w-full '>
              <div className="text-sm absolute -top-[1.2rem] text-black dark:text-white">Title</div>
              <input ref={title} type="text" placeholder='' className='border dark:border-none text-black dark:bg-white pl-2 p-0.5 h-10 w-full outline-none' />
            </div>

            {/* Author */}
            <div className='relative font-mont w-full  mt-8'>
              <div className="text-sm absolute -top-[1.2rem] text-black dark:text-white">Author</div>
              <input ref={author} type="text" placeholder='' className='border dark:border-none text-black dark:bg-white pl-2 p-0.5 h-10 w-full outline-none' />
            </div>

            {/* Description */}
            <div className="relative font-mont w-full  mt-8">
              <div className="text-sm absolute -top-[1.2rem] text-black dark:text-white">Description</div>
              <textarea ref={description} name="" id="" rows={7} className="border dark:border-none text-black dark:bg-white w-full resize-none outline-none pl-2"></textarea>
            </div>

            {/* Images */}
            <div className="h-full flex flex-col justify-start font-mont text-sm w-full text-white mt-3">
              
              <div className="flex justify-between items-center">
                <div>
                  <div className='text-black dark:text-white'>Image</div>
                  <div className='text-xs text-gray-400'>( Max 4 images )</div>
                </div>

                <div>
                  <input onChange={(e) => onFileSelected(e)} id="files" type="file" className='hidden' multiple accept="image/jpeg, image/png, image/jpg" />
                  <label htmlFor="files" className='p-1 text-main-dark bg-white font-mont border dark:border-none'>Select File</label>
                </div>


              </div>

              <div className='mt-2 gap-2.5 h-full pb-6 grid grid-rows-2 grid-flow-col justify-items-center items-center '>
                
                { files && files.length !== 0 && files.map((_n: any, i: string | number) => {
                  return (
                    <div onClick={() => onFileRemoved(_n)} key={files[i].name} className="w-full h-full aspect-w-1 aspect-h-1 relative mx-auto overflow-hidden flex row-span-1 bg-white transition-all ease-in-out duration-100">
                      <Image src={URL.createObjectURL(files[i])} alt={files[i].name} fill className='object-cover'></Image>
                    </div>
                  )
                })
                  
                }

                

              
              </div>
              
              
            </div>

            <div className=" w-full flex justify-end items-center">
              <div onClick={onSubmit} className="p-2 px-4 text-main-dark bg-white font-mont border dark:border-none">Submit</div>
            </div>

          
          </div>
          
          {/* Desktop */}
          <div className="hidden md:flex flex-col justify-start items-start p-5 pt-10 absolute inset-[6rem]">

            {/* Title && Author */}
            <div className='relative font-mont w-full flex flex-col space-y-8 lg:space-y-0 lg:grid grid-cols-2 grid-flow-row gap-x-5'>
              <div className='relative'>
                <div className="text-sm absolute -top-[1.2rem] text-black dark:text-white">Title</div>
                <input ref={title} type="text" placeholder='' className='border dark:border-none  text-black dark:bg-white pl-2 p-0.5 h-10 w-full outline-none' />
              </div>

              <div className='relative'>
                <div className="text-sm absolute -top-[1.2rem] text-black dark:text-white">Author</div>
                <input ref={author} type="text" placeholder='' className='border dark:border-none  text-black dark:bg-white pl-2 p-0.5 h-10 w-full outline-none' />
              </div>
              
            
            </div>
            
            {/* Description */}
            <div className="relative font-mont w-full  mt-8">
              <div className="text-sm absolute -top-[1.2rem] text-black dark:text-white">Description</div>
              <textarea ref={description} name="" id=""  className="h-80 lg:h-96 border dark:border-none text-black dark:bg-white w-full resize-none outline-none pl-2"></textarea>
            </div>
            
            {/* Images */}
            <div className="h-full flex flex-col justify-start font-mont text-sm w-full text-white mt-3">
              
              <div className="flex justify-between items-center">
                <div>
                  <div className='text-black dark:text-white'>Image</div>
                  <div className='text-xs text-gray-400'>( Max 4 images )</div>
                </div>

                <div>
                  <input onClick={(e) => onFileSelected(e)} id="files" type="file" className='hidden' multiple accept="image/jpeg, image/png, image/jpg" />
                  <label htmlFor="files" className='p-1 text-main-dark bg-white font-mont border dark:border-none'>Select File</label>
                </div>


              </div>

              <div className='mt-2 gap-2.5 h-full pb-6 grid grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 lg:grid-flow-row grid-flow-col justify-items-center items-center '>
                
                { files && files.length !== 0 && files.map((_n: any, i: string | number) => {
                  return (
                    <div onClick={() => onFileRemoved(_n)} key={files[i].name} className="w-full h-full aspect-w-1 aspect-h-1 relative mx-auto overflow-hidden flex row-span-1 bg-white transition-all ease-in-out duration-100">
                      <Image src={URL.createObjectURL(files[i])} alt={files[i].name} fill className='object-cover'></Image>
                    </div>
                  )
                })
                  
                }
                
              
              </div>
              
              
            </div>

            <div className=" w-full flex justify-end items-center">
              <div onClick={onSubmit} className="p-2 px-4 text-main-dark bg-white font-mont border dark:border-none">Submit</div>
            </div>



          </div>
        </div>
      }


    </div>
  )
}



export default Test
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
