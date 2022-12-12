import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import PlaySound from './play-sound.js'

jest.useFakeTimers()

describe('<PlaySound />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<PlaySound />)
  })
})
