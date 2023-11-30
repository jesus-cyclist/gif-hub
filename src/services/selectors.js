import { createSelector } from 'reselect'

const getUser = (state) => state.rootReducer.user
export const selectUser = createSelector(getUser, (user) => user)

const getFilterTags = (state) => state.rootReducer.filterTags
export const selectFilterTags = createSelector(
  getFilterTags,
  (filterTags) => filterTags.tags
)

const getIsDarkThemeActive = (state) => state.rootReducer.theme
export const selectTheme = createSelector(
  getIsDarkThemeActive,
  (theme) => theme.isDarkModeActive
)
