/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable putout/objects-braces-inside-array */
import Authors from './authors.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { it } from '@jest/globals'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<Authors />)
})
