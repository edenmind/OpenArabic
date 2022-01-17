import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import Heading from '../screens/Texts/Text/Heading'

jest.useFakeTimers()
describe('<Spinner />', () => {
  it('renders without crashing', () => {
    const propsMock = {
      title: 'title',
      author: 'author',
      source: 'source',
      readTime: 'readTime'
    }

    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<Heading heading={propsMock} />)
  })
})
