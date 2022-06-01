import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import { CloseOutlined } from '@mui/icons-material'
import { IconButton, Avatar } from '@mui/material'
import Form from './Form'
import { getPostState } from '../atoms/postAtom'
import { useRecoilValue } from 'recoil'
import Post from './Post'
import { useSession } from 'next-auth/react'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
}

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: 'easeOut'
    }
  }
}

const Modal = ({ handleClose, type }) => {
  const { data: session } = useSession()
  const post = useRecoilValue(getPostState)

  return (
    <>
      {type === 'dropIn' && (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className='rounded-xl flex flex-col justify-center bg-white dark:bg-gray-900 w-full max-w-lg md:-mt-96 mx-6'
            variants={dropIn}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='flex items-center justify-between border-b border-white/75 px-4 py-2.5'>
              <h4 className='text-xl'>Create a post</h4>
              <IconButton onClick={handleClose}>
                <CloseOutlined className='h-7 w-7 dark:text-white/75' />
              </IconButton>
            </div>
            <div className='p-4 space-y-2'>
              <div className='flex items-center space-x-2'>
                <Avatar src={session?.user?.image} className='!h-11 !w-11' />
                <h6>{session?.user?.name}</h6>
              </div>
              <Form />
            </div>
          </motion.div>
        </Backdrop>
      )}

      {type === 'gifYouUp' && (
        <Backdrop onClick={handleClose}>
          <motion.div
            className='modal rounded-l-lg bg-gray-900 w-full max-w-6xl -mt-[7vh] mx-6 flex '
            onClick={(e) => e.stopPropagation()}
            variants={gifYouUp}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <motion.img
              onDoubleClick={handleClose}
              src={post.photoUrl}
              className='object-contain max-h-[80vh] w-full max-w-3xl rounded-l-lg'
            />
            <div className='w-full md:w-3/5 bg-white dark:bg-gray-900 rounded-r-lg'>
              <Post post={post} modalPost />
            </div>
          </motion.div>
        </Backdrop>
      )}
    </>
  )
}

export default Modal
