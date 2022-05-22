import NavDrawer from './nav-drawer.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

const toggleDrawer = () => {}
it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  const isAuthenticated = false
  const state = {
    left: false
  }

  renderer.render(<NavDrawer isAuthenticated={isAuthenticated} toggleDrawer={toggleDrawer} state={state} />)
})
