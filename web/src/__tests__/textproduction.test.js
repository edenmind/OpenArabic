import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import TextProduction from '../screens/TextProduction'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<TextProduction />)
})
