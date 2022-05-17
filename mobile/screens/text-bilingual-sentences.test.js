import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import TextBilingualSentences from './text-bilingual-sentences.js'

jest.useFakeTimers()
describe('<Sentence />', () => {
  it('renders without crashing', () => {
    // eslint-disable-next-line putout/objects-braces-inside-array
    const propsMock = [
      {
        sentenceID: '1',
        arabic: [{ a: 'a' }],
        english: [{ e: 'e' }],
        sentenceId: 1
      }
    ]
    // @ts-ignore
    const renderer = new ShallowRenderer()

    renderer.render(<TextBilingualSentences sentences={propsMock} />)
  })
})
