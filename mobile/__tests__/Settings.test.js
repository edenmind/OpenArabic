import { cleanup } from '@testing-library/react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Settings from '../screens/About/AboutNavigator'
import { expect, describe, it, jest, afterEach } from '@jest/globals'

jest.useFakeTimers()
describe('<Settings />', () => {
  afterEach(cleanup)
  it('has 1 child', () => {
    const tree = renderer.create(<Settings />).toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
