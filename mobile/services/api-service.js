/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable unicorn/consistent-function-scoping */
import axios from 'axios'
import * as url from './url-service.js'

export const getTexts = (id) => async (dispatch) => {
  const res = await axios.get(url.categoryWithId(id)).catch((error) => console.log(error))

  dispatch({
    type: 'SET_TEXTS',
    payload: res.data
  })
}

export const getCategories = () => async (dispatch) => {
  const res = await axios.get(url.categories()).catch((error) => console.log(error))

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

  const res = await axios.get(url.textWithId(id)).catch((error) => console.log(error))
  dispatch({
    type: 'SET_TEXT',
    payload: res.data
  })
  dispatch({
    type: 'SET_TEXT_LOADED',
    payload: true
  })
}
