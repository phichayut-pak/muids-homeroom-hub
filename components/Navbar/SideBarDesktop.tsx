import React, { FC, useState, useEffect } from 'react'
import SidebarDesktopBtn from '../Button/SidebarDesktopBtn'
import { Home } from '../Icons/Home'
import { Schedule } from '../Icons/Schedule'
import { Create } from '../Icons/Create'
import { Profile } from '../Icons/Profile'
import { NightMode } from '../Icons/NightMode'
import { LightMode } from '../Icons/LightMode'
import { SignOut } from '../Icons/SignOut'
import { SignIn } from '../Icons/SignIn'
import Image from 'next/image'
import muidsLogo from '../../public/muids-logo.png'
import whiteMuidsLogo from '../../public/white-muids-logo.png'

interface SidebarDesktop {
  darkMode: boolean,
  setDarkMode: any,
}

const SideBarDesktop: FC<SidebarDesktop> = ( { darkMode, setDarkMode }) => {

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
                <SidebarDesktopBtn href="/" svg={ <Home className={className} /> } name="Home" />
              </li>

              <li>
                <SidebarDesktopBtn href="/schedule" svg={ <Schedule className={className} /> } name="Schedule" />
              </li>
              
              <li>
                <div className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  <Create className={className} />
                  <span className="ml-3">Create</span>
                </div>
              </li>

              <li>
                <div className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  <Profile className={className} />
                  <span className="ml-3">Profile</span> 
                </div>
              </li>



              
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
                  <span className="ml-3">Switch Appearance</span> 
                </div>
              </li>

              <li>
                <div className="flex cursor-pointer items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
                  <SignOut className={className} />
                  <span className="ml-3">Sign out</span> 
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