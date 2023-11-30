import { createSlice } from '@reduxjs/toolkit'

const getFiltredTags = (tags, filterTag) => {
  return [...tags].filter((tag) => tag !== filterTag)
}

const filterTags = createSlice({
  name: 'filterTags',
  initialState: {
    tags: [],
  },
  reducers: {
    deleteFilterTag: (state, action) => {
      const filtredTags = getFiltredTags(state.tags, action.payload)
      state.tags = filtredTags
    },
    addFilterTag: (state, action) => {
      if (state.tags.includes(action.payload)) {
        const filtredTags = getFiltredTags(state.tags, action.payload)
        state.tags = filtredTags
        return
      }
      state.tags = [...state.tags, action.payload]
    },
  },
})

export const { deleteFilterTag, addFilterTag } = filterTags.actions
export default filterTags.reducer
