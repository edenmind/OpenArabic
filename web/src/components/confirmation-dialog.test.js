import ConfirmationDialog from './confirmation-dialog.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(
    <ConfirmationDialog
      handleCloseDialog={() => {}}
      handleAction={() => {}}
      openState={true}
      confirmationQuestion={''}
    />
  )
})
