import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import WordPairs from '../components/WordPairs'

jest.useFakeTimers()
describe('<WordPairs />', () => {
  it('renders without crashing', () => {
    const words = [
      {
        wordId: 123,
        english: 'alienation',
        arabic: 'وحشة',
        sentenceId: 23
      },
      {
        wordId: 137,
        english: 'his Lord',
        arabic: 'ربه',
        sentenceId: 23
      }
    ]
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<WordPairs words={words} />)
  })
})
