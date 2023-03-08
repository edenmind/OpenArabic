import CategoriesList from './categories-list.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

const handleClickOpenDummy = () => {
  console.log('handleClickOpen')
}
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  // eslint-disable-next-line putout/objects-braces-inside-array
  const categories = [
    { name: 'Category 1', id: '1', description: 'Category 1 description', level: '10' },
    { name: 'Category 2', id: '2', description: 'Category 2 description', level: '20' }
  ]

  renderer.render(<CategoriesList category={categories} handleClickOpen={handleClickOpenDummy} />)
})
