import TextListIdSentences from './text-list-id-sentences.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  // eslint-disable-next-line putout/objects-braces-inside-array
  const sentences = [{ english: 'english', arabic: 'arabic' }]

  renderer.render(<TextListIdSentences sentences={sentences} />)
})
