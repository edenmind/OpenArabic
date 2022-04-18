import { ENDPOINT, HOST } from '../constants/urls'
import { GET_CATEGORIES, GET_TEXT, GET_TEXTS } from '../redux/actions'

/* eslint-disable no-unreachable */
import axios from 'axios'

export const getTexts = (category = '') => {
  const url =
    category === ''
      ? `${HOST.backend}/${ENDPOINT.texts}`
      : `${HOST.backend}/${ENDPOINT.texts}/${ENDPOINT.categories}/${category}`

  try {
    return async (dispatch) => {
      const res = await axios.get(url)
      if (res.data) {
        dispatch({
          type: GET_TEXTS,
          payload: res.data
        })
      } else {
        console.log('Unable to fetch')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCategories = () => {
  try {
    return async (dispatch) => {
      const url = `${HOST.backend}/${ENDPOINT.categories}`

      const res = await axios.get(url)
      if (res.data) {
        dispatch({
          type: GET_CATEGORIES,
          payload: res.data
        })
      } else {
        console.log('Unable to fetch')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getText = (id) => {
  try {
    return async (dispatch) => {
      const url = `${HOST.backend}/${ENDPOINT.texts}/${id}`
      const res = await axios.get(url)
      if (res.data) {
        dispatch({
          type: GET_TEXT,
          payload: res.data
        })
      } else {
        console.log('Unable to fetch')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
