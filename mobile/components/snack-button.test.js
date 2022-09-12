import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import SnackButton from './snack-button.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()
describe('<SnackButton />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SnackButton visible={true} onDismissSnackBar={() => {}} text={'abc'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<SnackButton visible={true} onDismissSnackBar={() => {}} text={'abc'} />)
  })
})
