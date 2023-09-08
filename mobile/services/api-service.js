import axios from 'axios'
import axiosRetry from 'axios-retry'

import * as url from './url-service.js'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response.status >= 500
  }
})
export const getTexts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_TEXTS_LOADED',
      payload: false
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
        type: 'SET_TEXTS',
        payload: combinedData
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
        type: 'SET_TEXTS',
        payload: filteredData
      })
    } else if (wordsRes) {
      // Grammar
      dispatch({
        type: 'SET_TEXTS',
        payload: wordsRes.data
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    dispatch({
      type: 'SET_TEXTS_LOADED',
      payload: true
    })
  }
}

export const getCategories = () => async (dispatch) => {
  const res = await axios.get(url.categories())

  const filteredCategories = res.data.filter((category) => category.name !== 'Quotes')

  dispatch({
    type: 'SET_CATEGORIES',
    payload: filteredCategories
  })
}

export const getWords = (difficultyLevel, numberOfWordsToPractice) => async (dispatch) => {
  const urlWordsWithParameters = `${url.words()}?numberOfWordsToPractice=${numberOfWordsToPractice}&difficultyLevel=${difficultyLevel}`
  const res = await axios.get(urlWordsWithParameters)

  dispatch({
    type: 'SET_WORDS',
    payload: res.data
  })
}

export const getText = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'RESET_TEXT'
    })
    dispatch({
      type: 'SET_TEXT_LOADED',
      payload: false
    })

    const res = await axios.get(url.textWithId(id))
    dispatch({
      type: 'SET_TEXT',
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  } finally {
    dispatch({
      type: 'SET_TEXT_LOADED',
      payload: true
    })
  }
}
