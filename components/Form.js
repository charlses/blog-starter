import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
import { handlePostState } from '../atoms/postAtom'

const Form = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)

  const uploadPost = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        userName: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()
    console.log(responseData)

    setHandlePost(true)

    setModalOpen(false)
  }

  return (
    <form className='flex flex-col relative space-y-2 text-black/80 dark:text-white/75'>
      <textarea
        placeholder='What do you want to talk about?'
        rows='4'
        className='bg-transparent focus:outline-none dark:placeholder-white/75'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type='text'
        placeholder='Add image URL (optional)'
        className='bg-transparent focus:outline-none dark:placeholder-white/75 truncate max-w-xs md:max-w-sm'
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        className='absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1'
        disabled={!input.trim() && !photoUrl.trim()}
        type='submit'
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  )
}

export default Form
