import userReducer from './user'
import { logOut, updatePost, addNewPost, deletePost, logIn } from './user'

describe('test iser reducer', () => {
  const initialState = { userData: null, isAuth: false, posts: [] }
  const initialStateUserAuth = {
    userData: {
      email: 'semen@mail.ru',
      id: 1,
      name: 'semen',
      password: 'qwerty',
    },
    isAuth: true,
    posts: [
      { _id: 123, data: 1 },
      { _id: 245, data: 2 },
    ],
  }

  it('should return initial value', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('should get log out', () => {
    expect(userReducer(initialState, logOut())).toEqual(initialState)

    expect(userReducer(initialStateUserAuth, logOut())).toEqual(initialState)
  })

  it('should add new post', () => {
    expect(
      userReducer(initialState, addNewPost({ _id: 123, data: 1 }))
    ).toEqual({
      ...initialState,
      posts: [{ _id: 123, data: 1 }],
    })

    expect(
      userReducer(
        {
          ...initialState,
          posts: [{ _id: 123, data: 1 }],
        },
        addNewPost({ _id: 222, data: 2 })
      )
    ).toEqual({
      ...initialState,
      posts: [
        { _id: 123, data: 1 },
        { _id: 222, data: 2 },
      ],
    })
  })

  it('should delete post', () => {
    expect(
      userReducer(
        {
          ...initialState,
          posts: [
            { _id: 123, data: 1 },
            { _id: 245, data: 2 },
          ],
        },
        deletePost([{ _id: 123, data: 1 }])
      )
    ).toEqual({ ...initialState, posts: [{ _id: 123, data: 1 }] })
  })

  it('should log in', () => {
    const payload = {
      email: 'test',
      id: 'test',
      name: 'test',
      password: 'test',
      posts: [{ _id: 123, data: 1 }],
    }
    expect(userReducer(initialState, logIn(payload))).toEqual({
      userData: { email: 'test', id: 'test', name: 'test', password: 'test' },
      isAuth: true,
      posts: [{ _id: 123, data: 1 }],
    })
  })

  it('should update post', () => {
    expect(
      userReducer(
        { ...initialState, posts: [{ _id: 123, data: 1 }] },
        updatePost({ _id: 123, data: 2 })
      )
    ).toEqual({ ...initialState, posts: [{ _id: 123, data: 2 }] })
  })
})
