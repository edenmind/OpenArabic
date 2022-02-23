import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import Sentences from '../screens/Texts/Text/Sentences'

jest.useFakeTimers()
describe('<ChipText />', () => {
  it('renders without crashing', () => {
    const funcMock = console.log('test')
    const propsMock = [
      {
        text: 'text',
        func: funcMock
      }
    ]
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<Sentences sentences={propsMock} />)
  })
})
