import CategoriesAdd from './categories-add.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<CategoriesAdd />)
})
