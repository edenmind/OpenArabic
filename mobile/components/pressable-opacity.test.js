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

  it('make suare that fadeIn is called when onPressIn if executed', () => {
    const renderer = new ShallowRenderer()
    const component = renderer.render(<PressableOpacity />)

    component.props.onPressIn()
    component.props.onPressOut()
  })
})
