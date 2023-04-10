import React, { FC } from 'react'
import Link from 'next/link'
import { Home } from '../Icons/Home'

interface SidebarDesktopBtn {
  href: string,
  svg: any,
  name: string
}

const SidebarDesktopBtn: FC<SidebarDesktopBtn> = ({ href, svg, name }) => {

  return (
    <div>
      <Link href={href} className="flex items-center p-5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-150 ease-in">
        { svg }
        <span className="ml-3">{ name }</span>
      </Link>
    </div>
  )
}

export default SidebarDesktopBtn