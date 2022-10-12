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

  test('delete text should be called', async () => {
    // given
    mock.onDelete(`${process.env.REACT_APP_API_URL}/texts/abc`).reply(200)
    // when
    await api.deleteText('abc')
    // then
    expect(mock.history.delete[0].url).toEqual(`${process.env.REACT_APP_API_URL}/texts/abc`)
  })

  test('delete author should be called', async () => {
    // given
    mock.onDelete(`${process.env.REACT_APP_API_URL}/authors/abc`).reply(200)
    // when
    await api.deleteAuthor('abc')
    // then
    expect(mock.history.delete[0].url).toEqual(`${process.env.REACT_APP_API_URL}/authors/abc`)
  })

  test('delete category should be called', async () => {
    // given
    mock.onDelete(`${process.env.REACT_APP_API_URL}/categories/abc`).reply(200)
    // when
    await api.deleteCategory('abc')
    // then
    expect(mock.history.delete[0].url).toEqual(`${process.env.REACT_APP_API_URL}/categories/abc`)
  })

  test('update category should be called', async () => {
    // given
    mock.onPut(`${process.env.REACT_APP_API_URL}/categories/abc`).reply(200)
    // when
    await api.updateCategory('abc', 'abc')
    // then
    expect(mock.history.put[0].url).toEqual(`${process.env.REACT_APP_API_URL}/categories/abc`)
  })
})
