import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import PressableOpacity from './pressable-opacity.js'

jest.useFakeTimers()
describe('<ModalScrollView />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<PressableOpacity />)
  })
})
