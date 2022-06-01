import Hero from '../components/Hero'
import MainHeader from '../components/MainHeader'
import Head from 'next/head'

const Home = () => {
  return (
    <div className='space-y-10 relative'>
      <Head>
        <title>Tech Phoenix | Blog test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainHeader />
      <Hero />
    </div>
  )
}

export default Home
