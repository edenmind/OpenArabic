import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import renderer from 'react-test-renderer'
import SelectableChip from './selectable-chip.js'

jest.useFakeTimers()
describe('<SnackButton />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SelectableChip text={'abc'} language={'english'} func={() => {}} selected={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
