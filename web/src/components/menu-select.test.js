import MenuSelect from './menu-select.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

const onChangeFunc = () => {}
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(<MenuSelect onChangeFunc={onChangeFunc} Heading={''} value={''} Values={['a', 'b', 'c']} />)
})
