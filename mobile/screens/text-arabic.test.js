import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '../redux/store.js'
import TextArabic from './text-arabic.js'

jest.useFakeTimers()

describe('<TextArabic />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextArabic />
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
