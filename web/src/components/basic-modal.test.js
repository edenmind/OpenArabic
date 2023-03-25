import React from 'react'
import { render, screen } from '@testing-library/react'
import BasicModal from './basic-modal.js'
import '@testing-library/jest-dom'

describe('BasicModal', () => {
  test('renders modal title and text', () => {
    const title = 'Modal Title'
    const text = 'Modal Text'

    render(<BasicModal open={true} handleClose={() => {}} title={title} text={text} />)

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
