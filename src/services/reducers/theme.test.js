import themeReducer from './theme'
import { changeTheme } from './theme'

describe('test theme reducer', () => {
  const initialState = {
    isDarkModeActive: false,
  }

  it('should return initial value', () => {
    expect(themeReducer(undefined, {})).toEqual(initialState)
  })

  it('should switch theme', () => {
    expect(themeReducer(initialState, changeTheme())).toEqual({
      isDarkModeActive: true,
    })

    expect(themeReducer({ isDarkModeActive: true }, changeTheme())).toEqual(
      initialState
    )
  })
})
