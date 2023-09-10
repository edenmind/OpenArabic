import { expect, describe, jest } from '@jest/globals'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { useSelector } from 'react-redux'

import { getText, getTexts } from './api-service.js'
const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn()
}))
describe('getTexts', () => {
  let mock

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  test('should dispatch SET_TEXTS_LOADED with false for getTexts', async () => {
    mock.onGet().reply(200, { data: 'test' })
    await getTexts('test')(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: false,
      type: 'SET_TEXTS_LOADED'
    })
  })

  test('should dispatch RESET_TEXT for getText', async () => {
    mock.onGet().reply(200, { data: 'test' })
    await getText('test')(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'RESET_TEXT'
    })
  })

  test('should dispatch SET_TEXT_LOADED with false for getText', async () => {
    mock.onGet().reply(200, { data: 'test' })
    await getText('test')(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: false,
      type: 'SET_TEXT_LOADED'
    })
  })

  test('should dispatch SET_TEXT_LOADED with true for getText', async () => {
    mock.onGet().reply(200, { data: 'test' })
    await getText('test')(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: true,
      type: 'SET_TEXT_LOADED'
    })
  })

  test('should dispatch SET_TEXTS_LOADED with true for getTexts', async () => {
    mock.onGet().reply(200, { data: 'test' })
    await getTexts('test')(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: true,
      type: 'SET_TEXTS_LOADED'
    })
  })

  describe('MyComponent', () => {
    it('renders with correct data from Redux store', () => {
      const mockState = {
        texts: {
          data: [
            { id: 1, title: 'Test Text 1' },
            { id: 2, title: 'Test Text 2' }
          ],
          loaded: true
        }
      }
      useSelector.mockImplementation((selector) => selector(mockState))
      // Render MyComponent and perform assertions
    })
  })
})
