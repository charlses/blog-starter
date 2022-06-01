import { atom } from 'recoil'

export const handlePostSTate = atom({
  key: 'handlePostState',
  default: false
})

export const getPostState = atom({
  key: 'getPostState',
  default: {}
})

export const useSSRPostsState = atom({
  key: 'useSSRPostsState',
  default: true
})
