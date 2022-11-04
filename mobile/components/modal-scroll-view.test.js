import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import ModalScrollView from './modal-scroll-view.js'

jest.useFakeTimers()
describe('<ModalScrollView />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const hideModal = () => console.log('Dummy function')
    const renderer = new ShallowRenderer()

    renderer.render(<ModalScrollView title={'Title'} content={'Content'} visible={true} hideModal={hideModal} />)
  })
})
