import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  isAuth: false,
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
    logOut: (state) => {
      state.userData = null
      state.isAuth = false
      state.posts = []
      state.loginStatus = {
        isLoading: false,
        isRejected: false,
        response: null,
      }
    },
    updatePost: (state, action) => {
      state.posts = [
        ...state.posts.map((post) => {
          if (post._id === action.payload.data.response._id) {
            return action.payload.data.response
          }
          return post
        }),
      ]
    },
    addNewPost: (state, action) => {
      state.posts = [...state.posts, action.payload.data.response]
    },
    deletePost: (state, action) => {
      state.posts = action.payload.data.response
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchLogin.pending, (state) => {
  //       state.loginStatus = {
  //         isLoading: true,
  //         isRejected: false,
  //         response: null,
  //       }
  //     })
  //     .addCase(fetchLogin.rejected, (state) => {
  //       state.loginStatus = {
  //         isLoading: false,
  //         isRejected: true,
  //       }
  //     })
  //     .addCase(fetchLogin.fulfilled, (state, action) => {
  //       const { posts, name, id, password, email } = action.payload
  //       state.userData = {
  //         password,
  //         email,
  //         name,
  //         userId: id,
  //       }
  //       state.isAuth = true
  //       state.posts = posts
  //       state.loginStatus = {
  //         isLoading: false,
  //         isRejected: false,
  //         response: action.payload,
  //       }
  //     })
  // },
})

export const { logOut, updatePost, addNewPost, deletePost } = userSlice.actions
export default userSlice.reducer
