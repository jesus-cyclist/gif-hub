import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  isAuth: false,
  posts: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData = null
      state.isAuth = false
      state.posts = []
    },
    logIn: (state, action) => {
      const { email, id, name, password, posts } = action.payload
      state.userData = {
        email,
        id,
        name,
        password,
      }
      state.isAuth = true
      state.posts = posts
    },

    updatePost: (state, action) => {
      state.posts = [
        ...state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        }),
      ]
    },
    addNewPost: (state, action) => {
      state.posts = [...state.posts, action.payload]
    },
    deletePost: (state, action) => {
      state.posts = action.payload
    },
  },
})

export const { logOut, updatePost, addNewPost, deletePost, logIn, dropPosts } =
  userSlice.actions
export default userSlice.reducer
