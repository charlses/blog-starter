import {
  CloseOutlined,
  CommentOutlined,
  DeleteOutlined,
  MoreHorizOutlined,
  ReplyOutlined
} from '@mui/icons-material'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded'
import { Avatar, IconButton } from '@mui/material'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { getPostState, handlePostSTate } from '../atoms/postAtom'
import { useSession } from 'next-auth/react'
import TimeAgo from 'timeago-react'

const Post = ({ post, modalPost }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  const [showInput, setShowInput] = useState(false)
  const [postState, setPostState] = useRecoilState(getPostState)
  const [handlePost, setHandlePost] = useRecoilState(handlePostSTate)
  const [liked, setLiked] = useState(false)
  const { data: session } = useSession()

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'Application/json' }
    })

    setHandlePost(true)
    setModalOpen(false)
  }

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + ' ...see more' : string

  return (
    <div
      className={`bg-white dark:bg-gray-900 ${
        modalPost ? 'rounded-r-lg' : 'rounded-lg'
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className='flex items-center px-2.5 cursor-pointer'>
        <Avatar src={post.userImg} className='!h-10 !w-10 cursor-pointer' />
        <div className='mr-auto ml-2 leading-none'>
          <h6 className='font-medium hover:text-blue-500 hover:underline'>
            {post.userName}
          </h6>
          <p className='text-sm dark:text-white/80 opacity-80'>{post.email}</p>
          {/* Time Ago */}
          <TimeAgo
            datetime={post.createdAt}
            className='text-xs dark:text-white/75 opacity-80'
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseOutlined className='dark:text-white/75 h-7 w-7' />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizOutlined className='dark:text-white/75 h-7 w-7' />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className='px-2.5 break-all md:break-normal'>
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}
      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          className='w-full cursor-pointer'
          onClick={() => {
            setModalOpen(true)
            setModalType('gifYouUp')
            setPostState(post)
          }}
        />
      )}
      <div className='flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 text-black/60 dark:text-white/75'>
        {modalPost ? (
          <button className='postButton'>
            <CommentOutlined />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && 'text-blue-500'}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className='-scale-x-100' />
            ) : (
              <ThumbUpOffAltOutlinedIcon className='-scale-x-100' />
            )}
            <h4>Like</h4>
          </button>
        )}
        {session?.user?.email === post.email ? (
          <button
            className='postButton focus:text-red-400'
            onClick={deletePost}
          >
            <DeleteOutlined />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className='postButton'>
            <ReplyOutlined className='-scale-x-100' />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  )
}

export default Post