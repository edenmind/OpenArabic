import { afterEach, describe, expect, it, jest } from '@jest/globals'

import React from 'react'
import TextItem from '../components/TextItem'
import { cleanup, render } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

jest.useFakeTimers()
describe('<TextItem />', () => {
  afterEach(cleanup)
  it('has 1 child', () => {
    const tree = renderer.create(<TextItem title="someTitle" />).toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })

  it('should find the button via contactButton', () => {
    const testIdName = 'listItem'

    const { getByTestId } = render(<TextItem title="someTitle" />)
    const foundItem = getByTestId(testIdName)

    expect(foundItem).toBeTruthy()
  })
})
