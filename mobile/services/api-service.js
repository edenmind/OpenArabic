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
export const getTexts = (id) => async (dispatch) => {
  try {
    dispatch({
      payload: false,
      type: 'SET_TEXTS_LOADED'
    })

    let textRes
    let wordsRes

    if (!id) {
      // Home
      wordsRes = await axios.get(url.wordsHome())
      textRes = await axios.get(url.categoryWithId())
    } else if (id === 'Grammar') {
      // Grammar
      wordsRes = await axios.get(url.wordsHome())
    } else {
      // Category
      textRes = await axios.get(url.categoryWithId(id))
    }

    // remove all items from wordRes in which the grammar property is empty
    // this should be done in the backend
    if (wordsRes) {
      wordsRes.data = wordsRes.data.filter((item) => item.grammar)
    }

    if (textRes && wordsRes) {
      // Home
      const combinedData = [...textRes.data, ...wordsRes.data]

      combinedData.sort((a, b) => {
        const dateA = new Date(a.publishDate || a.publishAt)
        const dateB = new Date(b.publishDate || b.publishAt)

        return dateB - dateA
      })

      dispatch({
        payload: combinedData,
        type: 'SET_TEXTS'
      })
    } else if (textRes) {
      // Category
      const filteredData = textRes.data

      filteredData.sort((a, b) => {
        const dateA = new Date(a.publishDate || a.publishAt)
        const dateB = new Date(b.publishDate || b.publishAt)

        return dateB - dateA
      })

      dispatch({
        payload: filteredData,
        type: 'SET_TEXTS'
      })
    } else if (wordsRes) {
      // Grammar
      dispatch({
        payload: wordsRes.data,
        type: 'SET_TEXTS'
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    dispatch({
      payload: true,
      type: 'SET_TEXTS_LOADED'
    })
  }
}

export const getCategories = () => async (dispatch) => {
  const res = await axios.get(url.categories())

  const filteredCategories = res.data.filter((category) => category.name !== 'Quotes')

  dispatch({
    payload: filteredCategories,
    type: 'SET_CATEGORIES'
  })
}

export const getWords = (difficultyLevel, numberOfWordsToPractice) => async (dispatch) => {
  const urlWordsWithParameters = `${url.words()}?numberOfWordsToPractice=${numberOfWordsToPractice}&difficultyLevel=${difficultyLevel}`
  const res = await axios.get(urlWordsWithParameters)

  dispatch({
    payload: res.data,
    type: 'SET_WORDS'
  })
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
