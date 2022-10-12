import TextAddWordsGenerate from './text-add-words-generate.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import store from '../redux/store.js'
import { Provider } from 'react-redux'
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  renderer.render(
    <Provider store={store}>
      <TextAddWordsGenerate />
    </Provider>
  )
})

it('should match snapshot', () => {
  const renderer = new ShallowRenderer()

  renderer.render(
    <Provider store={store}>
      <TextAddWordsGenerate />
    </Provider>
  )

  const result = renderer.getRenderOutput()

  expect(result).toMatchSnapshot()
})
