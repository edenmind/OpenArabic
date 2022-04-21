import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Home from '../screens/Home'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Home />)
})
