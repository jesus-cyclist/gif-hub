import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkModeActive: false,
  },
  reducers: {
    changeTheme: (state) => {
      state.isDarkModeActive = !state.isDarkModeActive
    },
  },
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer
