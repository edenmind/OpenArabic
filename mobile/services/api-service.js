/* eslint-disable import/no-named-as-default-member */
import * as url from './url-service.js'
import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Retry on network errors, timeouts, and 5xx status codes
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response.status >= 500
  }
})
export const getTexts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_TEXTS_LOADED',
      payload: false
    })

    const res = await axios.get(url.categoryWithId(id))

    dispatch({
      type: 'SET_TEXTS',
      payload: res.data
    })
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

  dispatch({
    type: 'SET_CATEGORIES',
    payload: res.data
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
