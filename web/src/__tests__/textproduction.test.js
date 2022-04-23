import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Text from '../screens/TextAddMeta'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Text />)
})
