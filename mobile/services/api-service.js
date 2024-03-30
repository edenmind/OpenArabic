/* eslint-disable import/no-named-as-default-member */
import axios from 'axios'
import axiosRetry from 'axios-retry'

import * as url from './url-service.js'

axiosRetry(axios, {
  retries: 5,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response.status >= 500
  },
  retryDelay: axiosRetry.exponentialDelay
})

export const getCategories = () => async (dispatch) => {
  const res = await axios.get(url.categories())
  dispatch({
    payload: res.data,
    type: 'SET_CATEGORIES'
  })
}

export const getTexts = (id) => async (dispatch) => {
  dispatch({ payload: false, type: 'SET_TEXTS_LOADED' })

  try {
    const texts = await fetchTextTypes(id)

    const processedTexts = texts
      .filter(({ grammar, status }) => grammar || status)
      .map((item) => ({
        ...item,
        grammar: item.grammar ? filterAndSortData(item.grammar, 'grammar') : undefined,
        status: item.status ? filterAndSortData(item.status, 'status') : undefined
      }))
      .sort((a, b) => getPublishDate(b) - getPublishDate(a))

    dispatch({
      payload: processedTexts,
      type: 'SET_TEXTS'
    })
  } catch (error) {
    console.error(error) // Prefer console.error for errors
  } finally {
    dispatch({ payload: true, type: 'SET_TEXTS_LOADED' })
  }
}

export const getText = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'RESET_TEXT'
    })
    dispatch({
      payload: false,
      type: 'SET_TEXT_LOADED'
    })

    const res = await axios.get(url.textWithId(id))
    dispatch({
      payload: res.data,
      type: 'SET_TEXT'
    })
  } catch (error) {
    console.log(error)
  } finally {
    dispatch({
      payload: true,
      type: 'SET_TEXT_LOADED'
    })
  }
}

// Private functions

const filterAndSortData = (data, prop) => {
  if (data && Array.isArray(data)) {
    data = data.filter((item) => item[prop])
    data.sort((a, b) => {
      return new Date(b.publishDate || b.publishAt) - new Date(a.publishDate || a.publishAt)
    })
  }
  return data
}

const getPublishDate = (item) => {
  return new Date(item.publishDate || item.publishAt)
}

const fetchTextTypes = async (id) => {
  if (!id) {
    const wordsHomeData = await axios.get(url.wordsHome())
    const categoryData = await axios.get(url.categoryWithId())

    return [...wordsHomeData.data, ...categoryData.data]
  }

  if (id === 'Grammar') {
    const wordsHomeData = await axios.get(url.wordsHome())
    return wordsHomeData.data
  }

  const categoryData = await axios.get(url.categoryWithId(id))
  return categoryData.data
}
