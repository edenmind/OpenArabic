import * as url from './url-service.js'
import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

export const getTexts = (id) => async (dispatch) => {
  dispatch({
    type: 'SET_TEXTS_LOADED',
    payload: false
  })
  const res = await axios.get(url.categoryWithId(id))

  // pause for 1 second to let images load, there is a better way of doing this
  await new Promise((resolve) => setTimeout(resolve, 500))

  dispatch({
    type: 'SET_TEXTS',
    payload: res.data
  })

  dispatch({
    type: 'SET_TEXTS_LOADED',
    payload: true
  })
}

export const getCategories = () => async (dispatch) => {
  const res = await axios.get(url.categories())

  dispatch({
    type: 'SET_CATEGORIES',
    payload: res.data
  })
}

export const getText = (id) => async (dispatch) => {
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
  dispatch({
    type: 'SET_TEXT_LOADED',
    payload: true
  })
}
