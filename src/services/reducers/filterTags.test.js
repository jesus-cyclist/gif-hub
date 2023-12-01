import filterTagsReducer from './filterTags'
import { deleteFilterTag, addFilterTag } from './filterTags'

describe('test filtertags reducer', () => {
  const initialState = {
    tags: [],
  }

  it('should return initial state', () => {
    expect(filterTagsReducer(undefined, { type: 'any action' })).toEqual(
      initialState
    )
  })

  it('should add tag', () => {
    expect(filterTagsReducer(initialState, addFilterTag('test'))).toEqual({
      tags: ['test'],
    })

    expect(filterTagsReducer({ tags: [1] }, addFilterTag(2))).toEqual({
      tags: [1, 2],
    })
  })

  it('should delete tag', () => {
    expect(filterTagsReducer(initialState, deleteFilterTag('test'))).toEqual({
      tags: [],
    })

    expect(filterTagsReducer({ tags: [1] }, deleteFilterTag(2))).toEqual({
      tags: [1],
    })

    expect(filterTagsReducer({ tags: [1] }, deleteFilterTag(1))).toEqual({
      tags: [],
    })
  })
})
