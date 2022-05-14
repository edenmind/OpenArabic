/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable unicorn/consistent-function-scoping */
import { ENDPOINT, HOST } from '../constants/urls.js'
import { GET_CATEGORIES, GET_TEXT, GET_TEXTS } from '../redux/actions.js'
import axios from 'axios'

export const getTexts =
  (category = '') =>
  async (dispatch) => {
    const url =
      category === ''
        ? `${HOST.backend}/${ENDPOINT.texts}`
        : `${HOST.backend}/${ENDPOINT.texts}/${ENDPOINT.categories}/${category}`

    const res = await axios.get(url).catch((error) => console.log(error))

    dispatch({
      type: GET_TEXTS,
      payload: res.data
    })
  }

export const getCategories = () => async (dispatch) => {
  const url = `${HOST.backend}/${ENDPOINT.categories}`
  const res = await axios.get(url).catch((error) => console.log(error))

  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  })
}

export const getText = (id) => async (dispatch) => {
  const url = `${HOST.backend}/${ENDPOINT.texts}/${id}`
  const res = await axios.get(url).catch((error) => console.log(error))

  dispatch({
    type: GET_TEXT,
    payload: res.data
  })
}
