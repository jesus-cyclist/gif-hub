import { combineReducers } from 'redux'
import userReducer from './services/reducers/user'
import themeReducer from './services/reducers/theme'
import filterTagsReducer from './services/reducers/filterTags'

export const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  filterTags: filterTagsReducer,
})
