import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home } from '../Icons/Home'
import { HomeFill } from '../Icons/HomeFill'
import { Schedule } from '../Icons/Schedule'
import { ScheduleFill } from '../Icons/ScheduleFill'
import { Create } from '../Icons/Create'
import { CreateFill } from '../Icons/CreateFill'

// use in FC<NavbarMobile> after setting up the pages for each one
interface NavbarMobile {
  // isHomeActive: boolean
  // isScheduleActive: boolean
  // isAddPostActive: boolean
  // isAddNightActive: boolean // this one might not gonna work since it's just the logo that changes and the theme's color
  // isProfileActive: boolean
  darkMode: boolean
  setDarkMode: any
}

const NavbarMobile: FC<NavbarMobile> = ( { darkMode, setDarkMode } ) => {

  const router = useRouter()
  const { pathname } = router

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const className = 'text-gray-500 w-8 h-8 dark:text-white'

  return (
    // ******************************************************************************
    // *  height is still unknown for this -> set height after the content is done  *
    // ******************************************************************************
    <div className={darkMode? 'dark' : ''}>

        <div className={`px-3 bottom-0 h-16 z-40 fixed w-full bg-main dark:bg-main-dark flex justify-between items-center border-t transition duration-150 ease-in`}>
      
        {/* find 5 logos ( for each page ) */}

        <Link href="/" id="home">
          { pathname === '/' ? <HomeFill className={className} /> : <Home className={className} /> }
        </Link>

        <Link href="/schedule" id="schedule">
          { pathname === '/schedule' ? <ScheduleFill className={className} /> : <Schedule className={className}/> }
        </Link>

        {/* if not teacher, make this disappear */}
        <Link href='/create' id="add_post">
          { pathname === '/create' && <CreateFill className={className} />}
          { pathname !== '/create' && <Create className={className} />}
        </Link>


        <div id="night" onClick={toggleTheme}>
          
          {darkMode && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="text-gray-500 w-8 h-8 dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          }

          {!darkMode && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="text-gray-500 w-8 h-8 dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg> }

        </div>

        <div id="profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="text-gray-500 w-8 h-8 dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default NavbarMobile