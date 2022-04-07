import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '2',
    title: 'Second Post',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    content: 'More text',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '1',
    title: 'First Post!',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    content: 'Hello!',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addedPost: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, usersId) {
        return {
          payload: {
            id: nanoid(),
            user: usersId,
            date: new Date().toISOString(),
            title,
            content,
          },
        }
      },
    },
    updatedPost: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    addedReaction: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { addedPost, updatedPost, addedReaction } = postsSlice.actions
export default postsSlice.reducer
