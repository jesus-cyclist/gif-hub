import { createSlice } from '@reduxjs/toolkit'
import { createAsyncAction } from '../../utils/request'
import { serverUrl } from '../../constants/url'

export const fetchLogin = createAsyncAction({
  prefix: 'user/login',
  path: `${serverUrl}/auth/user`,
  method: 'POST',
})

const initialState = {
  user: null,
  isAuth: false,
  userId: null,
  posts: [],
  loginStatus: {
    isLoading: false,
    isRejected: false,
    response: null,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push({ title: action.payload.data, gifs: [] })
    },
    logOut: (state) => {
      state.user = null
      state.isAuth = false
      state.userId = null
      state.posts = []
      state.loginStatus = {
        isLoading: false,
        isRejected: false,
        response: null,
      }
    },
    updatePosts: (state, action) => {
      state.posts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loginStatus = {
          isLoading: true,
          isRejected: false,
          response: null,
        }
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginStatus = {
          isLoading: false,
          isRejected: true,
        }
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const { collections, username, id } = action.payload
        state.user = username
        state.isAuth = true
        state.userId = id
        state.posts = collections
        state.loginStatus = {
          isLoading: false,
          isRejected: false,
          response: action.payload,
        }
      })
  },
})

export const { createPost, logOut, updatePosts } = userSlice.actions
export default userSlice.reducer
