import Image from 'next/image'
import HeaderLink from './HeaderLink'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { getProviders, signIn } from 'next-auth/react'

const MainHeader = () => {
  return (
    <div>
      <header className='flex justify-around items-center py-4'>
        <section className='relative'>
          <Image src='/img/phono.png' width={50} height={50} />
        </section>
        <section>
          <div className='flex items-center sm:divide-x divide-gray-300'>
            <div className='hidden sm:flex space-x-8 pr-4'>
              <HeaderLink Icon={HomeOutlinedIcon} Text='Home' />
              <HeaderLink Icon={ExploreOutlinedIcon} Text='Explore' />
              <HeaderLink Icon={InfoOutlinedIcon} Text='About' />
              <HeaderLink Icon={EmailOutlinedIcon} Text='Contact' />
            </div>
            <div className='pl-4'>
              <button
                className='text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2'
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                Sign In
              </button>
            </div>
          </div>
        </section>
      </header>
    </div>
  )
}

export default MainHeader
