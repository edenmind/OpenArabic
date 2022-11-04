import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import TextBilingualHeading from './text-bilingual-heading.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()
describe('<TextBilingualHeading />', () => {
  const propsMock = {
    title: 'title',
    author: 'author',
    source: 'source',
    image: 'image',
    readingTime: '5 min read'
  }
  it('renders correctly', () => {
    const tree = renderer.create(<TextBilingualHeading heading={propsMock} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()

    renderer.render(<TextBilingualHeading heading={propsMock} />)
  })
})
