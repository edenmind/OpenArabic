import * as url from './url-service.js'
import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 3 })

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
