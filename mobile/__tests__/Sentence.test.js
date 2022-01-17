import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import Sentences from '../screens/Texts/Text/Sentences'

jest.useFakeTimers()
describe('<Sentence />', () => {
  it('renders without crashing', () => {
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
    renderer.render(<Sentences sentences={propsMock} />)
  })
})
