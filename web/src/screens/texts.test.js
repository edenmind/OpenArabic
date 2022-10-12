import Texts from './texts.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Texts />)
})

it('should match snapshot', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<Texts />)

  const result = renderer.getRenderOutput()

  expect(result).toMatchSnapshot()
})
