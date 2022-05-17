import { expect, describe, it, jest, afterEach } from '@jest/globals'
import { render, cleanup } from '@testing-library/react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import About from './about.js'

jest.useFakeTimers()

describe('<About />', () => {
  afterEach(cleanup)
  it('has 1 child', () => {
    const tree = renderer.create(<About />).toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
  it('should find the button via contactButton', () => {
    const testIdName = 'contactButton'
    const { getByTestId } = render(<About />)
    const foundButton = getByTestId(testIdName)

    expect(foundButton).toBeTruthy()
  })

  it('should find the button title', () => {
    const title = 'Contact us'
    const { getByText } = render(<About />)
    const foundButtonTitle = getByText(title)

    expect(foundButtonTitle.props.children).toEqual(title)
  })

  it('should not find the button with wrong title', () => {
    const notFoundText = 'Should not be found'
    const { queryByText } = render(<About />)
    const notFoundButtonTitle = queryByText(notFoundText)

    expect(notFoundButtonTitle).toBeNull()
  })
})
