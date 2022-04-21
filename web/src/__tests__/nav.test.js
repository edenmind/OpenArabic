import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Nav from '../screens/Nav'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Nav />)
})
