import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { connectToDatabase } from '../util/mongodb'

export default function Home({ posts }) {
  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/home')
    }
  })

  return (
    <div className='bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll space-y-6'>
      <Head>
        <title>Texh Phoenix | Blog Test</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Main posts={posts} />
    </div>
  )
}

export async function getServerSideProps(context) {
  // Check if user is authenticated on the server
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/home'
      }
    }
  }

  const { db } = await connectToDatabase()
  const posts = await db
    .collection('posts')
    .find()
    .sort({ timeStamp: -1 })
    .toArray()

  return {
    props: {
      session,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        userName: post.userName,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt
      }))
    }
  }
}
