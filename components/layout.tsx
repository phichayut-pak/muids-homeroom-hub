import React, { FC, useEffect, useState } from 'react'
import NavbarMobile from './Navbar/NavbarMobile'
import SideBarDesktop from './Navbar/SideBarDesktop'

interface Layout {
  children: any
}

const Layout: FC<Layout> = ({ children }) => {

  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [padding, setPadding] = useState<string>('')

  // Padding and Margin top for the mobile design
  useEffect(() => {
    if(window.innerWidth < 640) {

      if(window.innerHeight >= 700) {
        setPadding('pb-36')
      }

      if(window.innerHeight < 700) {
        setPadding('pb-44')
      }
  
      if(window.innerHeight < 630) {
        setPadding('pb-56')
      }
  
      if(window.innerHeight < 500) {
        setPadding('pb-64')
      }
  
      if(window.innerHeight < 450) {
        setPadding('pb-80')
      }
  
      if(window.innerHeight < 310) {
        setPadding('pb-[26rem]')
      }
    } 

    if(window.innerWidth >= 640) {

      if(window.innerHeight >= 700){
        setPadding('pb-56')
      }

      if(window.innerHeight < 700) {
        setPadding('pb-64')
      }

      if(window.innerHeight < 650 ) {
        setPadding('pb-72')
      }

      if(window.innerHeight < 580 ) {
        setPadding('pb-80')
      }

      if(window.innerHeight < 510) {
        setPadding('pb-96')
      }

      if(window.innerHeight < 380) {
        setPadding('pb-[26rem]')
      }

      if(window.innerHeight < 320 ) {
        setPadding('pb-[30rem]')
      }
    }


    
    const postElement: any = document.querySelector('.navbar-post')
    // every windowHeight as much as possible
    // for responsive
    if(postElement) {
      
      // for smallest responsive design in this
      if(window.innerWidth < 640) {
        
        if(window.innerHeight >= 810) {
          postElement.style.marginTop = '4rem'
        }

        if(window.innerHeight >= 614 && window.innerHeight <= 810) {
          const vh = window.innerHeight * 0.10
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 614) {
          const vh = window.innerHeight * 0.30
          postElement.style.marginTop = `${vh}px`
        }
        
        if(window.innerHeight < 510) {
          const vh = window.innerHeight * 0.40
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 460) {
          const vh = window.innerHeight * 0.50
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 425) {
          const vh = window.innerHeight * 0.60
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 380) {
          const vh = window.innerHeight * 0.80
          postElement.style.marginTop = `${vh}px`
        }

      } 

      // for smaller responsive design in this
      if(window.innerWidth >= 640) {
        
        if(window.innerHeight >= 1050) {
          const vh = window.innerHeight * 0.05
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 1050) {
          const vh = window.innerHeight * 0.05
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 920) {
          const vh = window.innerHeight * 0.1
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 860) {
          const vh = window.innerHeight * 0.15
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 795) {
          const vh = window.innerHeight * 0.20
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 710) {
          const vh = window.innerHeight * 0.30
          postElement.style.marginTop = `${vh}px`
        }

        if(window.innerHeight < 660) {
          postElement.style.marginTop = `${window.innerHeight * 0.4}px`
        }

        if(window.innerHeight < 570) {
          postElement.style.marginTop = `${window.innerHeight * 0.5}px`
        }

        if(window.innerHeight < 510) {
          postElement.style.marginTop = `${window.innerHeight * 0.6}px`
        }

        if(window.innerHeight < 460) {
          postElement.style.marginTop = `${window.innerHeight * 0.8}px`
        }

        if(window.innerHeight < 400) {
          postElement.style.marginTop = `${window.innerHeight * 0.95}px`
        }

        if(window.innerHeight < 350) {
          postElement.style.marginTop = `${window.innerHeight * 1.1}px`
        }

        if(window.innerHeight < 280) {
          postElement.style.marginTop = `${window.innerHeight * 1.5}px`
        }
      } 

      
    }
  }, [setPadding])

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
    <div className='overflow-x-hidden'>
      <div className={`relative flex flex-col md:hidden
      ${padding}
      min-h-screen `}>
        <NavbarMobile darkMode={darkMode} setDarkMode={setDarkMode}/>
        <div className={`navbar-post`}>
          { children }
        </div>
      </div>
      <div className="hidden md:grid grid-cols-10 w-screen h-full">
        <div className='col-span-3 lg:col-span-2'>
          <SideBarDesktop darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className='col-span-7 lg:col-span-8 mt-10'>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Layout