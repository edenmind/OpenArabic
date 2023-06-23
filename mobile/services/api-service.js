/* eslint-disable import/no-named-as-default-member */
import * as url from './url-service.js'
import axios from 'axios'
import axiosRetry from 'axios-retry'

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

    const textRes = await axios.get(url.categoryWithId(id))
    const wordsRes = await axios.get(url.words())

    // also get words here

    dispatch({
      type: 'SET_TEXTS',
      payload: textRes.data
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
