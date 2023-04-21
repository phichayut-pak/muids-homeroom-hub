import React, { FC, useState, useEffect } from 'react'
import SidebarDesktopBtn from '../Button/SidebarDesktopBtn'
import { Home } from '../Icons/Home'
import { HomeFill } from '../Icons/HomeFill'
import { Schedule } from '../Icons/Schedule'
import { ScheduleFill } from '../Icons/ScheduleFill'
import { Create } from '../Icons/Create'
import { CreateFill } from '../Icons/CreateFill'
import { Profile } from '../Icons/Profile'
import { NightMode } from '../Icons/NightMode'
import { LightMode } from '../Icons/LightMode'
import { SignOut } from '../Icons/SignOut'
import { SignIn } from '../Icons/SignIn'
import Image from 'next/image'
import muidsLogo from '../../public/muids-logo.png'
import whiteMuidsLogo from '../../public/white-muids-logo.png'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

interface SidebarDesktop {
  darkMode: boolean,
  setDarkMode: any,
}

const SideBarDesktop: FC<SidebarDesktop> = ( { darkMode, setDarkMode } ) => {

  const router = useRouter()
  const { data: session }: any = useSession()


  const onSignIn = () => {
    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Sign in',
        background: `${localStorage.getItem('theme') === 'dark' ? '#1E2C5A' : 'white'}`,
        color: `${localStorage.getItem('theme') === 'dark' ? 'white' : 'black'}`,
        html:
          '<input type="email" id="swal-input1" class="swal2-input">' +
          '<input type="password" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        confirmButtonText: 'Submit',
        preConfirm: () => {
          return [
            (document.getElementById('swal-input1') as HTMLInputElement).value,
            (document.getElementById('swal-input2') as HTMLInputElement).value
          ]
        }
      })
    
      if (formValues) {
        Swal.showLoading()
        // send to auth
        const result = await signIn('credentials', {
          username: formValues[0],
          password: formValues[1],
          redirect: true
        })


        if(result?.status === 401) {
          switch(result.error) {
            case 'No user found!':
              Swal.fire({
                title: 'No user found!',
                text: 'The username you entered doesn\'t belong to an account. Please check your username and try again.',
                icon: 'error'
              })
              break
            case 'Could not log you in!':
              Swal.fire({
                title: 'Could not log you in!',
                text: 'Sorry, your password was incorrect. Please double-check your password.',
                icon: 'error'
              })
              break
          }
        } else {
          Swal.fire({
            title: 'Successful!',
            icon: 'success'
          })
        
        }
      }
    
      })()
  }

  const onSignOut = async () => {
    await signOut()
  }

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  
  const className = 'w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'

  return (
    <div className={darkMode ? 'dark w-full' : 'w-full'}>
      <aside id="default-sidebar" className="border-r dark:border-none fixed top-0 left-0 z-0 max-w-[30%] lg:max-w-[20%] w-full h-screen transition-all -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="text-lg h-full flex flex-col justify-around items-left px-5 py-4 overflow-y-auto bg-white dark:bg-main-dark font-mont font-light transition duration-75 ease-in">
          {/* MUIDs LOGO */}
          <div className='px-5 relative mx-auto w-full overflow-hidden flex'>
            <div className='w-36 h-36'>
              <Image src={darkMode? whiteMuidsLogo: muidsLogo} alt="MUIDS"></Image>
            </div>
          </div>

          {/* Upper Navbar Buttons */}
          <div>
            <ul className="space-y-5 font-medium">

              <li>
                <div onClick={() => router.push('/')} className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  {/* <HomeFill className={className} /> */}
                  { router.pathname === '/' && <HomeFill className={className}/> } 
                  { router.pathname !== '/' && <Home className={className}/> }
                  <span className="ml-3">Home</span>
                </div>
              </li>

              <li>
                <div onClick={() => router.push('/schedule')} className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  { router.pathname === '/schedule' && <ScheduleFill className={className}/> } 
                  { router.pathname !== '/schedule' && <Schedule className={className}/> }
                  <span className="ml-3">Schedule</span>
                </div>
              </li>
              
              { session && session?.user?.isAdmin &&
                <li>
                  <div onClick={() => router.push('/create')} className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                    { router.pathname === '/create' && <CreateFill className={className} />}
                    { router.pathname !== '/create' && <Create className={className} />}
                    <span className="ml-3">Create</span>
                  </div>
                </li>
              }
            </ul>
          </div>

          {/* Lower Navbar Buttons */}

          <div>
            <ul className='space-y-5 font-medium'>
              
              <li>
                <div onClick={toggleTheme} className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  {
                    darkMode ? <LightMode className={className} /> : <NightMode className={className} />
                  }
                  <span className="ml-3">{darkMode ? 'Light' : 'Dark'} Mode</span> 
                </div>
              </li>

              <li>
                <div onClick={session ? onSignOut : onSignIn} className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  
                  {session ? <SignOut className={className} /> : <SignIn className={`${className}`} /> }
                  <span className="ml-3">
                    {session ? 'Sign out' : 'Sign in'}
                  </span>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </aside>

    </div>
  )
}

export default SideBarDesktop