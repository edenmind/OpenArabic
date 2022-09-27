import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import * as api from './api-service.js'

describe('fetchUsers', () => {
  let mock

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })
  test('texts should be called', async () => {
    // given
    mock.onGet(`${process.env.REACT_APP_API_URL}/texts`).reply(200)
    // when
    await api.getTexts()
    // then
    expect(mock.history.get[0].url).toEqual(`${process.env.REACT_APP_API_URL}/texts`)
  })

  test('authors should be called', async () => {
    // given
    mock.onGet(`${process.env.REACT_APP_API_URL}/authors`).reply(200)
    // when
    await api.getAuthors()
    // then
    expect(mock.history.get[0].url).toEqual(`${process.env.REACT_APP_API_URL}/authors`)
  })

  test('categories should be called', async () => {
    // given
    mock.onGet(`${process.env.REACT_APP_API_URL}/categories`).reply(200)
    // when
    await api.getCategories()
    // then
    expect(mock.history.get[0].url).toEqual(`${process.env.REACT_APP_API_URL}/categories`)
  })

  test('text should be called', async () => {
    // given
    mock.onGet(`${process.env.REACT_APP_API_URL}/texts/abc`).reply(200)
    // when
    await api.getText('abc')
    // then
    expect(mock.history.get[0].url).toEqual(`${process.env.REACT_APP_API_URL}/texts/abc`)
  })
})
