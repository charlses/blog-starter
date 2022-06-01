import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import CtaLink from './CtaLink'
import Image from 'next/image'
const Hero = () => {
  return (
    <div>
      <section className='flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto py-4 justify-between'>
        <div className='space-y-6 xl:space-y-12'>
          <h1 className='text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0'>
            Welcome to Tech Phoenix
          </h1>
          <div className='space-y-4'>
            <CtaLink
              Text='Search for a job'
              Icon={ArrowForwardIosOutlinedIcon}
            />
            <CtaLink
              Text='Find a person you know'
              Icon={ArrowForwardIosOutlinedIcon}
            />
            <CtaLink
              Text='Learn a new skill'
              Icon={ArrowForwardIosOutlinedIcon}
            />
          </div>
        </div>
        <div className='relative w-[400px] h-[350px] xl:w-[650px]  xl:h-[500px] top-20 xl:left-28'>
          <Image src={'/img/hero.png'} layout='fill' priority />
        </div>
      </section>
    </div>
  )
}

export default Hero
