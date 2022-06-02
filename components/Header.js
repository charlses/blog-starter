import Image from 'next/image'
import {
  GroupOutlined,
  SearchOutlined,
  BusinessCenterOutlined,
  ChatOutlined,
  NotificationsOutlined,
  HomeOutlined,
  AppsOutlined
} from '@mui/icons-material'
import HeaderLink from './HeaderLink'
import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const spring = {
  type: 'spring',
  stifness: 700,
  damping: 30
}

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <header className='sticky top-0 z-40 bg-white dark:bg-gray-900 flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg'>
      {/* left */}
      <section className='left'>
        {mounted && (
          <>
            {resolvedTheme === 'dark' ? (
              <Image src='/img/phono-light.png' width={50} height={50} />
            ) : (
              <Image src='/img/phono.png' width={50} height={50} />
            )}
          </>
        )}

        <div className='search'>
          <SearchOutlined />
          <input
            type='text'
            name='search'
            placeholder='Search'
            className='hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow'
          />
        </div>
      </section>
      {/* right */}
      <section className='right'>
        <HeaderLink Icon={HomeOutlined} Text='Home' feed active />
        <HeaderLink Icon={GroupOutlined} Text='My Network' feed />
        <HeaderLink Icon={BusinessCenterOutlined} Text='Jobs' feed hidden />
        <HeaderLink Icon={ChatOutlined} Text='Messaging' feed />
        <HeaderLink Icon={NotificationsOutlined} Text='Notifications' feed />
        <HeaderLink Icon={Avatar} Text='Me' feed avatar hidde />
        <HeaderLink Icon={AppsOutlined} Text='Work' feed hidden />
        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
            }`}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <span className='absolute left-0'>🌞</span>
            <motion.div
              className='w-5 h-5 bg-white rounded-full z-40'
              layout
              transition={spring}
            />
            <span className='absolute right-0.5'>🌜</span>
          </div>
        )}
      </section>
    </header>
  )
}

export default Header
