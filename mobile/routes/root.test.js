import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import Root from './root.js'
jest.useFakeTimers()
describe('<Root />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<Root />)
  })
})
