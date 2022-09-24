/* eslint-disable putout/objects-braces-inside-array */
import TextListCard from './text-list-card.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  const texts = [
    {
      arabic: [''],
      english: [''],
      status: 'Draft',
      publishAt: new Date().toUTCString(),
      wordByWord: [['']],
      title: '',
      texts: { arabic: '', english: '' },
      category: '',
      author: '',
      arabicSentence: [''],
      source: '',
      // eslint-disable-next-line putout/objects-braces-inside-array
      sentences: [
        {
          english: '',
          arabic: '',
          words: []
        }
      ]
    }
  ]

  renderer.render(<TextListCard texts={texts} />)
})
