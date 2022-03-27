import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Sentences from '../screens/Sentences'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Sentences />)
})
