import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import ModalScrollView from './modal-scroll-view.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()
describe('<ModalScrollView />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ModalScrollView title="abc" hideModal={() => {}} visible={true} content={'content'} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(<ModalScrollView title="abc" hideModal={() => {}} visible={true} content={'content'} />)
  })
})
