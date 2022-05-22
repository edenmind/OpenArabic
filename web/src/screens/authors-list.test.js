import AuthorsList from './authors-list.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

const handleClickOpen = () => {}
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  // eslint-disable-next-line putout/objects-braces-inside-array
  const authors = [
    { name: 'Author 1', id: '1' },
    { name: 'Author 2', id: '2' }
  ]

  renderer.render(<AuthorsList authors={authors} handleClickOpen={handleClickOpen} />)
})
