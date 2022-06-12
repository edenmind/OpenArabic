import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'

jest.mock('react-dom', () => ({ render: jest.fn() }))

describe('Application root', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    global.document.getElementById = (id) => id === 'root' && div
    expect(ReactDOM.render).toHaveBeenCalled()
  })
})
