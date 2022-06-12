import TextListCard from './text-list-card.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  const texts = [{ category: '', id: '', title: '', text: '', author: '', sentences: [] }]
  renderer.render(<TextListCard texts={texts} />)
})
