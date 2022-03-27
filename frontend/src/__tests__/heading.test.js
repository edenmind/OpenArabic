import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Heading from '../screens/Heading'

it('renders without crashing', () => {
  const categories = ['cat a', 'cat b', 'cat c']
  const authors = ['auth a', 'auth b', 'auth c']
  const title = 'a title'

  const renderer = new ShallowRenderer()
  renderer.render(<Heading Categories={categories} Authors={authors} Title={title} />)
})
