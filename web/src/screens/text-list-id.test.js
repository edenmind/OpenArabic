import TextListId from './text-list-id.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<TextListId />)
})

it('renders when isLoading is false', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<TextListId />)
})
