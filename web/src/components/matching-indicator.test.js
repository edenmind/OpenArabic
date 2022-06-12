import MatchingIndicator from './matching-indicator.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  renderer.render(
    <MatchingIndicator entity={'entity'} firstCondition={'firstCondition'} secondCondition={'secondCondition'} />
  )
})
