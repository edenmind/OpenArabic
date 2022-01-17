import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import AboutNavigator from '../screens/About/AboutNavigator'

jest.useFakeTimers()
describe('<App />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<AboutNavigator />)
  })
})
