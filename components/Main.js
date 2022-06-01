import Sidebar from './Sidebar'
import Feed from './Feed'
import { AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'
// import Widgets from './Widgets'

const Main = ({ posts, articles }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  return (
    <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
      <div className='flex flex-col md:flex-row gap-5'>
        <Sidebar />
        <Feed posts={posts} />
      </div>
      {/* widgets */}
      {/* <Widgets articles={articles} /> */}
      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={() => setModalOpen(false)} type={modalType} />
        )}
      </AnimatePresence>
    </main>
  )
}

export default Main
