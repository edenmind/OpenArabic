import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import TextBilingualSentencesWordPairs from './text-bilingual-sentences-word-pairs.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()
describe('<TextBilingualSentencesWordPairs /> renders without crashing', () => {
  // eslint-disable-next-line putout/objects-braces-inside-array
  const words = [
    {
      wordId: 123,
      english: 'alienation',
      arabic: 'وحشة',
      sentenceId: 23
    },
    {
      wordId: 137,
      english: 'his Lord',
      arabic: 'ربه',
      sentenceId: 23
    }
  ]
  test('renders correctly', () => {
    const tree = renderer.create(<TextBilingualSentencesWordPairs words={words} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()

    renderer.render(<TextBilingualSentencesWordPairs words={words} />)
  })
})
