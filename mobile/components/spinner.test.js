import { describe, it, jest } from '@jest/globals'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import Spinner from './spinner.js'

jest.useFakeTimers()
describe('<Spinner />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<Spinner />)
  })
})
