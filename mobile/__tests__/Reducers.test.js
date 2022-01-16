import { categoriesReducer, textReducer, textsReducer } from '../redux/reducers'

it('categoriesReducer should return the initial state', () => {
  expect(categoriesReducer(undefined, {})).toEqual({
    categories: []
  })
})

it('textReducer should return the initial state', () => {
  expect(textReducer(undefined, {})).toEqual({
    text: {}
  })
})

it('textsReducer should return the initial state', () => {
  expect(textsReducer(undefined, {})).toEqual({
    texts: []
  })
})
