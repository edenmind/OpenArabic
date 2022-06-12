import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import SelectableChip from './selectable-chip.js'

jest.useFakeTimers()
describe('<SnackButton />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<SelectableChip text={'abc'} language={'english'} func={() => {}} selected={true} />)
  })
})
