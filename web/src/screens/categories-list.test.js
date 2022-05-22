import CategoriesList from './categories-list.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

const handleClickOpen = () => {}
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  // eslint-disable-next-line putout/objects-braces-inside-array
  const categories = [
    { name: 'Category 1', id: '1' },
    { name: 'Category 2', id: '2' }
  ]

  renderer.render(<CategoriesList category={categories} handleClickOpen={handleClickOpen} />)
})
