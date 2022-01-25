import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '../redux/store'
import TextBilingual from '../screens/Texts/Text/TextBilingual'

jest.useFakeTimers()

describe('<TextBilingual />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextBilingual />
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
